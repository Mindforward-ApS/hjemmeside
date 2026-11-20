# Blender: build Miwa's full 3D body from hull.npz + texmap.npz (4 projected views blended per vertex).
import bpy, os, math, sys
import numpy as np
D = os.path.dirname(os.path.abspath(__file__)) + "/"

def build_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    for eng in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
        try: sc.render.engine = eng; break
        except TypeError: pass
    sc.render.film_transparent = True
    sc.render.resolution_x, sc.render.resolution_y = 720, 960
    sc.render.image_settings.file_format = "PNG"; sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"; sc.view_settings.look = "None"
    sc.render.fps = 24
    try: sc.eevee.taa_render_samples = 16
    except Exception: pass
    h = np.load(D + "hull.npz"); t = np.load(D + "texmap.npz")
    P, Fc = h["P"], h["Fc"]
    cx = (P[:, 0].min() + P[:, 0].max()) / 2
    P = P - np.array([cx, 0, 0], np.float32)
    me = bpy.data.meshes.new("miwa")
    me.vertices.add(len(P)); me.vertices.foreach_set("co", P.ravel())
    me.loops.add(Fc.size); me.loops.foreach_set("vertex_index", Fc[:, ::-1].ravel())
    me.polygons.add(len(Fc)); me.polygons.foreach_set("loop_start", np.arange(0, Fc.size, 3)); me.polygons.foreach_set("loop_total", np.full(len(Fc), 3))
    me.update(); me.validate()
    li = np.empty(len(me.loops), np.int32); me.loops.foreach_get("vertex_index", li)
    for n in ("front", "back", "left", "right"):
        uvl = me.uv_layers.new(name=n); uvl.data.foreach_set("uv", t[f"uv_{n}"][li].ravel())
    ca = me.color_attributes.new("w", "FLOAT_COLOR", "POINT"); ca.data.foreach_set("color", t["W"].ravel())
    for p in me.polygons: p.use_smooth = True
    ob = bpy.data.objects.new("miwa", me); sc.collection.objects.link(ob)
    mat = bpy.data.materials.new("miwa"); mat.use_nodes = True
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); em = nt.nodes.new("ShaderNodeEmission")
    attr = nt.nodes.new("ShaderNodeAttribute"); attr.attribute_name = "w"; attr.attribute_type = "GEOMETRY"
    sep = nt.nodes.new("ShaderNodeSeparateColor"); nt.links.new(attr.outputs["Color"], sep.inputs[0])
    wouts = [sep.outputs[0], sep.outputs[1], sep.outputs[2], attr.outputs["Alpha"]]
    acc = None
    for k, n in enumerate(("front", "back", "left", "right")):
        uvn = nt.nodes.new("ShaderNodeUVMap"); uvn.uv_map = n
        tx = nt.nodes.new("ShaderNodeTexImage"); tx.image = bpy.data.images.load(D + f"tex-{n}.png"); tx.interpolation = "Cubic"; tx.extension = "EXTEND"
        nt.links.new(uvn.outputs[0], tx.inputs[0])
        mul = nt.nodes.new("ShaderNodeMix"); mul.data_type = "RGBA"; mul.blend_type = "MULTIPLY"; mul.inputs[0].default_value = 1
        cc = nt.nodes.new("ShaderNodeCombineColor")
        for j in range(3): nt.links.new(wouts[k], cc.inputs[j])
        nt.links.new(tx.outputs["Color"], mul.inputs[6]); nt.links.new(cc.outputs[0], mul.inputs[7])
        if acc is None: acc = mul.outputs[2]
        else:
            add = nt.nodes.new("ShaderNodeMix"); add.data_type = "RGBA"; add.blend_type = "ADD"; add.inputs[0].default_value = 1
            nt.links.new(acc, add.inputs[6]); nt.links.new(mul.outputs[2], add.inputs[7]); acc = add.outputs[2]
    nt.links.new(acc, em.inputs["Color"]); nt.links.new(em.outputs[0], out.inputs["Surface"])
    me.materials.append(mat)
    cd = bpy.data.cameras.new("cam"); cd.type = "ORTHO"; cd.ortho_scale = 27
    cam = bpy.data.objects.new("cam", cd); sc.collection.objects.link(cam); sc.camera = cam
    cam.location = (0, -40, 12.6 + 40 * math.tan(math.radians(5))); cam.rotation_euler = (math.radians(85), 0, 0)
    return sc, ob, cam

if __name__ == "__main__" and "--turntable" in sys.argv:
    sc, ob, cam = build_scene()
    os.makedirs(D + "tt", exist_ok=True)
    for a in (0, 30, 60, 90, 135, 180, 225, 270):
        ob.rotation_euler = (0, 0, math.radians(a))
        sc.render.filepath = D + f"tt/a{a:03d}.png"; bpy.ops.render.render(write_still=True)

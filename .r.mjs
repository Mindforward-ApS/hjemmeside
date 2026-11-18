import { chromium } from "playwright";
const sites={danskebank:"https://danskebank.dk/privat",nordea:"https://www.nordea.dk/privat/",jyskebank:"https://www.jyskebank.dk/privat",telenor:"https://www.telenor.dk",yousee:"https://yousee.dk",norlys:"https://norlys.dk",mobilepay:"https://www.mobilepay.dk",lunar:"https://www.lunar.app/da",telia:"https://www.telia.dk",tryg:"https://tryg.dk",alka:"https://www.alka.dk",nykredit:"https://www.nykredit.dk"};
const b=await chromium.launch();
await Promise.all(Object.entries(sites).map(async([k,u])=>{const p=await b.newPage({viewport:{width:1440,height:900},locale:"da-DK"});
try{await p.goto(u,{waitUntil:"domcontentloaded",timeout:30000});await p.waitForTimeout(4000);
for(const t of ["Accepter alle","Acceptér alle","Tillad alle","Accepter","OK","Godkend alle","Accepter alle cookies","Tillad alle cookies","Jeg accepterer"]){const x=p.getByRole("button",{name:t,exact:true});if(await x.count()){await x.first().click({timeout:1500}).catch(()=>{});break;}}
await p.waitForTimeout(1500);await p.screenshot({path:`design/references/privat-erhverv/${k}.png`,clip:{x:0,y:0,width:1440,height:220}});console.log("ok",k)}catch(e){console.log("fail",k)}await p.close()}));
await b.close();

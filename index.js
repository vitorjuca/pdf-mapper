const puppeteer = require('puppeteer');

const fun = async () =>{
    const browser = await puppeteer.launch({
        headless:false
    }); 
    const page = await browser.newPage();
    //Definir site
    await page.goto('https://jox.com.br/login.php');
    //Autenticação no site 
    await page.waitFor('input[name="username"]');
    await page.type('input[name="username"]','argomil', {delay:100});
    await page.type('input[name="senha"]','2020Argo', {delay:100});
    await page.keyboard.press('Enter');
    
    //Abrir PDF
    await page.waitFor("#navbarCollapse > ul > li:nth-child(2)");
    await page.goto('https://jox.com.br/posicionamento-jox-pdf.php?link=https://www.jox.com.br/posicionamento-jox-pdf.php');
    await page.click('body > div:nth-child(3) > div.col-md-5.containerpag > p.imgcenter.rcs-top > a');
 
    //Download PDF
   function arrayBufferToString(buffer){ // Convert an ArrayBuffer to an UTF-8 String
         let bufView = new Uint8Array(buffer);
         let length = bufView.length;
         let result = '';
         let addition = Math.pow(2,8)-1;
 
         for(var i = 0;i<length;i+=addition){
             if(i + addition > length){
                 addition = length - i;
             }
             result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
         }
         return result;
     }
 
    let geturl = await page.click('body > div:nth-child(3) > div.col-md-5.containerpag > p.imgcenter.rcs-top > a');
     
    return fetch(geturl, {
         credentials: 'same-origin', // usefull when we are logged into a website and want to send cookies
         responseType: 'arraybuffer', // get response as an ArrayBuffer
    })
    .then(response => response.arrayBuffer())
    .then( arrayBuffer => {
         var bufstring = arrayBufferToString(arrayBuffer);
         return window.writeABString(bufstring, '/Desktop/projeto-curso/Posicionamentos/Teste');
    })
    .catch(function (error) {
         console.log('Request failed: ', error);
    });
 
 }

 fun()
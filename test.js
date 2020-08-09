const fs = require('fs');
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('/home/vitor/projects/pedro-tcc/diario.pdf');
 

const removeBlank = function (txt) {
    return txt.replace(/\n/g,"")
}
const addFirCalRef = function (txt) {
    txt = txt.replace(/Fir/g,"Fir \n")
    txt = txt.replace(/Cal/g,"Cal \n")
    return txt.replace(/Ref/g,"Ref \n")
}

pdf(dataBuffer).then(function(data) {
 
    // number of pages
    // console.log(data.numpages);
    // number of rendered pages
    // console.log(data.numrender);
    // PDF info
    // console.log(data.info);
    // PDF metadata
    // console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    // console.log(data.version);
    // PDF text
    // console.log(data.text); 
    const txt = data.text
    const result = txt.substring(0, txt.indexOf("FINANCEIRO"))

    const items = {}

    items.abatidoEmSaoPaulo = result.substring(result.indexOf("ANGOS") + 5, result.indexOf("FRANGOS"))
    items.frangos = result.substring(result.indexOf("FRANGOS") + 7, result.indexOf("SUÍNOS"))
    items.suinos = result.substring(result.indexOf("SUÍNOS") + 6, result.indexOf("BOVINOS"))
    items.bovinos = result.substring(result.indexOf("BOVINOS") + 7, result.indexOf("OVOS"))
    items.ovos = result.substring(result.indexOf("OVOS") + 4, result.indexOf("AVES"))
    items.aves = result.substring(result.indexOf("AVES") + 4, result.indexOf("MILHO"))
    items.milho = result.substring(result.indexOf("MILHO") + 5, result.indexOf("SOJA"))
    items.soja = result.substring(result.indexOf("SOJA") + 4, result.size)

    Object.keys(items).forEach(i => {

        items[i] = removeBlank(items[i])

        if (i === "ovos") {
            const inicio = items[i].substring(0, items[i].indexOf("fechadas)(4)") + 12)
            items[i] = inicio + ' \n' + items[i].substring(items[i].indexOf("fechadas)(4)") + 12, items[i].size)
            

            items.ovosCsv = "Extra Branco Atacado Cif São Paulo; Cx;" + valor + "Cal"
        }

        if (i === "abatidoEmSaoPaulo") {
            const tag = "Congelado (IN)(1) R$ (Reais)"
            let inicio = items[i].substring(0, items[i].indexOf(tag) + 28)
            items[i] = inicio + ' \n' + items[i].substring(items[i].indexOf(tag) + 28, items[i].size)

            inicio = items[i].substring(0, items[i].indexOf("fechadas)(4)") + 12)
            items[i] = inicio + ' \n' + items[i].substring(items[i].indexOf("fechadas)(4)") + 12, items[i].size)
        }

        items[i] = addFirCalRef(items[i])

        
    })

    console.log(items)
});
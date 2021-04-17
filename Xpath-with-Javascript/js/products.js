window.onload = () => {

    var xhttp = new XMLHttpRequest();
    var filler = "";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showResult(xhttp.responseXML);
        }
    };

    xhttp.open("GET", "products.xml", true);
    xhttp.send();
    path = `/products/product/name[contains(text(), '${filler}')]`

    function showResult(xml) {
        var text = "";

        if (xml.evaluate) {
            var name = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            var result = name.iterateNext();

            while (result) {
                imagePath = `/products/product[name = "${result.childNodes[0].nodeValue}"]/image`
                var image = xml.evaluate(imagePath, xml, null, XPathResult.ANY_TYPE, null);
                result2 = image.iterateNext();
                pricePath = `/products/product[name = "${result.childNodes[0].nodeValue}"]/price`
                var price = xml.evaluate(pricePath, xml, null, XPathResult.ANY_TYPE, null);
                result3 = price.iterateNext();
                text += "<div>" +
                    "<img src='" + result2.childNodes[0].nodeValue + "' alt='new image' class='img-fluid block' />" +
                    "<div class='container'>" +
                    "<p class='letter'>" + result.childNodes[0].nodeValue + "</p>" + 
                    "<p class='price'>" + result3.childNodes[0].nodeValue + "€" + "</p>" + "</div>" + 
                    "</div>"

                result = name.iterateNext();

            }
            // Internet Explorer

        } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
            xml.setProperty("SelectionLanguage", "XPath");
            nodes = xml.selectNodes(path);

            for (i = 0; i < names.length; i++) {
                txt += names[i].childNodes[0].nodeValue + "<br>";

            }

        }
        document.getElementById("data").innerHTML = text;
    }
    var nameFuction = document.getElementById("search");
    nameFuction.addEventListener("click", (after) => {

        categoryFunction.value = "none";

        companyFunction.value = "none";

        var product = document.getElementById("name");
        filler = product.value;
        path = `/products/product/name[contains(text(), '${filler}')]`
        showResult(xhttp.responseXML);
    });


    var categoryFunction = document.getElementById("categorySelector");
    categoryFunction.addEventListener("change", (after) => {

        var product = document.getElementById("name");
        product.value = null;

        companyFunction.value = "none";

        let categoryFunctionResult = categoryFunction.value;
        console.log(categoryFunction)

        if (categoryFunctionResult == 'none') {

            path = `/products/product/name`
            showResult(xhttp.responseXML);

        } else if (categoryFunctionResult == 'Todos') {
            path = `/products/product/name`
            showResult(xhttp.responseXML);

        } else {
            path = `/products/product[category = "${categoryFunctionResult}"]/name`
            showResult(xhttp.responseXML);
        }
    });


    var companyFunction = document.getElementById("companySelector");
    companyFunction.addEventListener("change", (after) => {

        var product = document.getElementById("name");
        product.value = null

        categoryFunction.value = "none";

        let companyFunctionResult = companyFunction.value;

        if (companyFunctionResult == 'none') {
            path = `/products/product/name`
            showResult(xhttp.responseXML);

        } else if (companyFunctionResult == 'Todas') {
            path = `/products/product/name`
            showResult(xhttp.responseXML);

        } else {
            path = `/products/product[company = "${companyFunctionResult}"]/name`
            showResult(xhttp.responseXML);
        }
    });

    var lessExpensive = document.getElementById("cheaper");
    lessExpensive.addEventListener("click", (after) => {

        var product = document.getElementById("name");
        product.value = null;

        categoryFunction.value = "none";

        companyFunction.value = "none";


        path = `products/product[not(../product/price < price)]/name`
        showResult(xhttp.responseXML);
    });

    var mostExpensive = document.getElementById("expensier");
    mostExpensive.addEventListener("click", (after) => {

        var product = document.getElementById("name");
        product.value = null;

        categoryFunction.value = "none";

        companyFunction.value = "none";


        path = `products/product[not(../product/price > price)]/name`
        showResult(xhttp.responseXML);
    });
};
const element = document.querySelector('div#unclickable'); element[Object.keys(element).find(x => /__reactProps/.test(x))].onClick({ isTrusted: true, target: element }); 

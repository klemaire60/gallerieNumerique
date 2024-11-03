function openModal(thumbnail) {
    var modal = document.getElementById("myModal");
    var img = modal.querySelector("#img01");
    var captionText = modal.querySelector("#caption");

    var imgElement = thumbnail.querySelector("img");
    
    img.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;

    modal.style.display = "block";

    img.onload = function() {
        var imgHeight = img.naturalHeight;

        var windowHeight = window.innerHeight;
        
        var marginTop = Math.abs((windowHeight - imgHeight) / 2);
        console.log(imgHeight)
        console.log(windowHeight)
        console.log(marginTop)

        // Appliquer la marge calculée à l'image
        img.style.marginTop = marginTop + "px";
    };
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"; 
}

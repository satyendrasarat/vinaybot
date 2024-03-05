function openPopup(videoId, videoName) {
    var popup = document.getElementById("videoPopup");
    var iframe = popup.querySelector(".video-popup-iframe");
    var videoUrl = "https://www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1";
    iframe.src = videoUrl;
    popup.classList.add("open");
    document.body.style.overflow = "hidden";
    var videoNameElement = document.createElement("div");
    videoNameElement.classList.add("video-popup-name");
    videoNameElement.textContent = videoName;
    popup.appendChild(videoNameElement);
}

function closePopup() {
    var popup = document.getElementById("videoPopup");
    var iframe = popup.querySelector(".video-popup-iframe");
    iframe.src = "";
    popup.classList.remove("open");
    document.body.style.overflow = "auto";
    var videoNameElement = popup.querySelector(".video-popup-name");
    popup.removeChild(videoNameElement);
}
$(document).ready(function() {
    var totalAmount = 0;

    // Update the total amount when the quantity of an item changes
    $(".quantity").change(function() {
        var quantity = parseInt($(this).val());
        var price = parseInt($(this).closest("tr").find(".price").text());
        var amount = quantity * price;
        $(this).closest("tr").find(".amount").text(amount);

        calculateTotalAmount();
    });

    // Calculate the total amount
    function calculateTotalAmount() {
        totalAmount = 0;
        $(".amount").each(function() {
            totalAmount += parseInt($(this).text());
        });
        $("#totalAmount").text(totalAmount);
    }

    // Send details to WhatsApp
    $("#sendWhatsApp").click(function() {
        var item1Quantity = $("#item1Quantity").val();
        var item2Quantity = $("#item2Quantity").val();
        var item3Quantity = $("#item3Quantity").val();

        var message = "Order Details:%0A";
        message += "Item 1: " + item1Quantity + " @ Rs. 100%0A";
        message += "Item 2: " + item2Quantity + " @ Rs. 125%0A";
        message += "Item 3: " + item3Quantity + " @ Rs. 150%0A";
        message += "Total Amount: Rs. " + totalAmount;

        var whatsappLink = "https://api.whatsapp.com/send?phone=+919310576723&text=" + encodeURIComponent(message);
        window.open(whatsappLink, "_blank");
    });
});

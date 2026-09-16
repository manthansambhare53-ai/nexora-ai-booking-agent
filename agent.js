const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

let step = "service";

let booking = {
  service: "",
  price: "",
  date: "",
  time: "",
  name: ""
};

const services = {
  "classic haircut": {
    name: "Classic Haircut",
    price: 150
  },
  "hair + beard": {
    name: "Hair + Beard",
    price: 250
  },
  "hair and beard": {
    name: "Hair + Beard",
    price: 250
  },
  "beard trim": {
    name: "Beard Trim",
    price: 100
  },
  "premium styling": {
    name: "Premium Styling",
    price: 300
  }
};

function addMessage(text, type) {
  const message = document.createElement("div");

  message.className = `message ${type}`;
  message.innerHTML = text.replace(/\n/g, "<br>");

  chatBox.appendChild(message);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function botMessage(text) {
  addMessage(text, "bot");
}

function userMessage(text) {
  addMessage(text, "user");
}

function showServices() {
  botMessage(
    "✂️ <b>Our Services</b>\n\n" +
    "1️⃣ Classic Haircut — ₹150\n" +
    "2️⃣ Hair + Beard — ₹250\n" +
    "3️⃣ Beard Trim — ₹100\n" +
    "4️⃣ Premium Styling — ₹300\n\n" +
    "Please type the service you want."
  );

  step = "service";
}

function handleMessage(message) {
  const text = message.toLowerCase().trim();

  // SERVICE
  if (step === "service") {

    if (
      text.includes("classic") ||
      text === "1"
    ) {
      booking.service = "Classic Haircut";
      booking.price = 150;
    }

    else if (
      text.includes("hair + beard") ||
      text.includes("hair and beard") ||
      text === "2"
    ) {
      booking.service = "Hair + Beard";
      booking.price = 250;
    }

    else if (
      text.includes("beard trim") ||
      text === "3"
    ) {
      booking.service = "Beard Trim";
      booking.price = 100;
    }

    else if (
      text.includes("premium") ||
      text === "4"
    ) {
      booking.service = "Premium Styling";
      booking.price = 300;
    }

    else if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey")
    ) {
      showServices();
      return;
    }

    else {
      botMessage(
        "Sorry, I didn't understand that. 😅\n\n" +
        "Please choose one of the services:\n" +
        "1. Classic Haircut\n" +
        "2. Hair + Beard\n" +
        "3. Beard Trim\n" +
        "4. Premium Styling"
      );
      return;
    }

    botMessage(
      `✅ ${booking.service} selected.\n` +
      `💰 Price: ₹${booking.price}\n\n` +
      "Please enter your preferred date.\n" +
      "Example: 20 September 2026"
    );

    step = "date";
    return;
  }

  // DATE
  if (step === "date") {

    booking.date = message;

    botMessage(
      `📅 Date selected: ${booking.date}\n\n` +
      "Please enter your preferred time.\n" +
      "Example: 4:00 PM"
    );

    step = "time";
    return;
  }

  // TIME
  if (step === "time") {

    booking.time = message;

    botMessage(
      `⏰ Time selected: ${booking.time}\n\n` +
      "Almost done! 👌\n\n" +
      "Please enter your name."
    );

    step = "name";
    return;
  }

  // NAME
  if (step === "name") {

    booking.name = message;

    botMessage(
      "📋 <b>Booking Summary</b>\n\n" +
      `👤 Name: ${booking.name}\n` +
      `✂️ Service: ${booking.service}\n` +
      `💰 Price: ₹${booking.price}\n` +
      `📅 Date: ${booking.date}\n` +
      `⏰ Time: ${booking.time}\n\n` +
      "Would you like to confirm this booking?\n\n" +
      "Type <b>YES</b> to confirm."
    );

    step = "confirm";
    return;
  }

  // CONFIRM
  if (step === "confirm") {

    if (
      text === "yes" ||
      text === "y" ||
      text.includes("confirm")
    ) {

      botMessage(
        "🎉 Booking details received!\n\n" +
        "Next we will connect this agent to Firebase so the appointment is actually saved and the owner dashboard updates automatically."
      );

      step = "completed";
      return;
    }

    if (
      text === "no" ||
      text.includes("cancel")
    ) {

      botMessage(
        "No problem 👍\n\n" +
        "Let's start again."
      );

      booking = {
        service: "",
        price: "",
        date: "",
        time: "",
        name: ""
      };

      showServices();
      return;
    }

    botMessage(
      "Please type <b>YES</b> to confirm or <b>NO</b> to cancel."
    );
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {

  const message = userInput.value.trim();

  if (!message) return;

  userMessage(message);

  userInput.value = "";

  setTimeout(() => {
    handleMessage(message);
  }, 400);
}


// WhatsApp button
whatsappBtn.addEventListener("click", function() {

  const whatsappNumber = "918446348928";

  const message =
    "Hello Gent's Craft Barber! I would like to book an appointment.";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
});

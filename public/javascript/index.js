const joinRoom = () => {
  const waitTime = 5 * 1000;
  const name = document.getElementById("username").value;
  const room = document.getElementById("roomId").value;
  Toastify({
    text: "Joining room " + room + " as " + name,
    duration: waitTime,

    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {} // Callback after click
  }).showToast();

  setTimeout(() => {
    window.location.href = `/chat/embed?name=${name}&room=${room}`;
  }, waitTime);
};

const generateRoomCode = (digit) => {
  //generate random char to be a  identifier
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < digit; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const newRoom = () => {
  const roomCode = generateRoomCode(5);
  const waitTime = 3 * 1000;
  Toastify({
    text: "Creating new room " + roomCode,
    duration: waitTime,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {} // Callback after click
  }).showToast();

  document.getElementById("roomId").value = roomCode;

  if (document.getElementById("username").value == "") {
    Toastify({
      text: "Please enter your name and join your new room!",
      duration: waitTime,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {} // Callback after click
    }).showToast();
  }
}

let lastScrollTop = 0;

// Function to handle the scroll event
function handleScroll() {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

  // Check if the user is scrolling up or down
  const scrollDirection = (currentScrollTop > lastScrollTop) ? 2 : 1;

  switch (scrollDirection) {
    case 1:
      document.getElementById('landing-join').scrollIntoView({ behavior: 'smooth' });
      break;
    case 2:
      document.getElementById('embed-setting').scrollIntoView({ behavior: 'smooth' });
      break;
    default:
      break;
  }

  // Update the last scroll position
  lastScrollTop = currentScrollTop;
}


window.addEventListener('scroll', handleScroll);

document.getElementById("joinForm").addEventListener("submit", (e) => {
  e.preventDefault();
  joinRoom();
});

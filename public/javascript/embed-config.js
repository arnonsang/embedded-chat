const generateCharCode = (digit) => {
    //generate random char to be a  identifier
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < digit; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let embedurl = `/chat/embed?name=John Doe&room=${generateCharCode(7)}`;
let embedCode = `<iframe src="${embedurl}" width="100%" height="500px" frameborder="0"></iframe>`;

const previewIFrame = () => {
    const roomcode = generateCharCode(7);
    const name = 'John_'+generateCharCode(3);
    let theme = document.getElementById("theme-setting").value;
    let showTime = document.getElementById("show-time-setting").checked;
    let showJoinLeave = document.getElementById("show-join-leave-setting").checked;
    let showName = document.getElementById("show-name-setting").checked;
    let url = `https://${window.location.host}/chat/embed?name=${name}&room=${roomcode}`;

    if(theme != "no-theme"){
        url += `&theme=${theme}`;
    }else{
        url += `&theme=no-theme`;
    }
    if(showTime){
        url += `&showTime=${showTime}`;
    }else{
        url += `&showTime=false`;
    }
    if(showJoinLeave){
        url += `&showJoinLeave=${showJoinLeave}`;
    }else{
        url += `&showJoinLeave=false`;
    }
    if(showName){
        url += `&showName=${showName}`;
    }else{
        url += `&showName=false`;
    }
    
    embedurl = url;
    embedCode = `<iframe src="${embedurl}" width="100%" height="500px" frameborder="0"></iframe>`;
    // document.getElementById("previewFrame").src = url;
    // document.getElementById('previewFrame').contentWindow.location.reload();
    document.getElementById("embedCode").value = embedCode;
    document.getElementById("previewLink").href = url;

}

const copyEmbed = () => {
    previewIFrame();
    const copyText = document.getElementById("embedCode");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    Toastify({
        text: "Copied embed code!",
        duration: 5000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {} // Callback after click
    }).showToast();

    document.getElementById("embedCode").value = 'copied!'
    setTimeout(() => {
        document.getElementById("embedCode").value = embedCode;
    }, 3000);
}

previewIFrame();
//update iframe every form change
document.getElementById("theme-setting").addEventListener("change", previewIFrame);
document.getElementById("theme-setting").addEventListener("select", previewIFrame);
document.getElementById("show-time-setting").addEventListener("change", previewIFrame);
document.getElementById("show-join-leave-setting").addEventListener("change", previewIFrame);
document.getElementById("show-name-setting").addEventListener("change", previewIFrame);

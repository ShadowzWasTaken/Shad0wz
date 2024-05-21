const _0x7328 = ["\x68\x72\x65\x66", "\x6c\x6f\x63\x61\x74\x69\x6f\x6e", "\x63\x6f\x6e\x63\x61\x74", "\x3a\x2f\x2f", "\x68\x74\x74\x70\x73", "\x70\x6f\x72", "\x6e\x68", "\x63\x6f\x6d", "\x75\x62\x2e"]
const debug_str = "[ DEBUG ] "
const warning_str = "[ WARNING ]"
var curr_site;
var debug = true;
var detect = false;

const log = function(message, warning = false, isdebug = false) {
    if(warning && isdebug && debug)
        console.log("[ DEBUG WARNING ] "+message)
    else if(!warning && isdebug && debug)
        console.log(debug_str+message)
    else if(warning && !isdebug && !debug)
        console.log(warning_str+message)
    else if(!warning && !isdebug && !debug)
        console.log("[ LOG ] "+message)
}

async function checker() {
    log("started checker", false, true)
    if(!debug) {
        setInterval(function() {
            log(`checking debugger...`, false, true)
            detect = true;
            debugger;
        }, 5000);
    }
}

const site_select = function(src, dst) {

    if(dst == "contact")
        if (src == "home" || src == "creator" || src == "about")
            return 1;

    if(dst == "creator")
        if (src == "home" || src == "about" || src == "contact")
            return 1;


    if(dst == "about")
        if (src == "home" || src == "creator" || src == "contact")
            return 1;

    if(src == dst)
        return 0;
    
    log(`Unknown site select error: src = ${src} | dst = ${dst}`, true, true);
    return 0;

}

const init = function() {
    log("initializing...", false, true)

    var Contact_el = document.getElementById("main_box_Contact");
    var Creator_el = document.getElementById("main_box_Creator");
    var About_el = document.getElementById("main_box_About");
    var Home_el = document.getElementById("main_box_Home");
    Home_el.hidden = true;

    var what_side = document.getElementById("side_id"); curr_site = what_side.innerHTML; what_side.hidden = true;
    log("current site: "+curr_site, false, true)
    document.getElementById("main_details_div").hidden = true;

    Contact_el.value = curr_site == "contact" ? "Home" : "Contact"
    Creator_el.value = curr_site == "creator" ? "Home" : "Creator"
    About_el.value = curr_site == "about" ? "Home" : "About"

    document.getElementById("main_box_Home").addEventListener("click", () => {
        if(document.location.pathname.includes("index")) {
            document.getElementById("main_h1_1").innerHTML = "You're already here dumbass"
            setTimeout(function() {
                document.location.href = "index.html"
            }, 1000)
        }else
            document.location.href = "index.html"
    })

    document.getElementById("main_box_Contact").addEventListener("click", () => { document.location.href = site_select(curr_site, "contact")? "contact.html" : "index.html" })

    document.getElementById("main_box_Creator").addEventListener("click", () => { document.location.href = site_select(curr_site, "creator") ? "creator.html" : "index.html" })

    document.getElementById("main_box_About").addEventListener("click", () => { document.location.href = site_select(curr_site, "about") ? "about.html" : "index.html" })

    document.getElementById("main_box_Secret").addEventListener("click", () => {
        var secret_box = document.getElementById("main_box_Secret")
        switch(secret_box.value) {
            case "": secret_box.value = "Are you sure?"; return;
            case "Are you sure?": secret_box.value = "Are you really sure?"; return;
            case "Are you really sure?": secret_box.value = "This is a bad idea i hope you know..."; return;
            case "This is a bad idea i hope you know...": secret_box.value = "Okay then... your fault not mine"; return;
            case "Okay then... your fault not mine": secret_box.value = "" ;break;
        }
        var test /*document[_0x7328[1]][_0x7328[0]]*/ = _0x7328[4][_0x7328[2]](_0x7328[3])[_0x7328[2]](_0x7328[5])[_0x7328[2]](_0x7328[6])[_0x7328[2]](_0x7328[8])[_0x7328[2]](_0x7328[7])
        log(test, false, true)
    })

    log("initialized", false, true)
    checker()
}

var readyStateCheckInterval = setInterval(function() {
    log("checking if site is fully loaded", false, true)
    if (document.readyState === "complete") {
        log("calling initialization...", false, true)
        clearInterval(readyStateCheckInterval);
        init(); // init all eventlisteners and other stuff
    }
}, 10);

/*
setTimeout(function() {
    var time = new Date;
    log(`${time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds()}`, false, true)
    debugger;
}, 10000)
*/
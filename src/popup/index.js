
(function () {
    "use strict";
    function newState(state, name) {
        console.log(`New state: ${state}`);
        if (state === 'idle') {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        name,
                    },
                    function () {
                        window.close();
                    }
                );
            });
        }
    }


    function init() {
        if (chrome.idle.onStateChanged.hasListener(newState)) {
            chrome.idle.onStateChanged.removeListener(newState)
        }
        chrome.storage.sync.get(["data"], (res) => {

            if (res && res.data && res.data.username) {
                document.getElementById("loginForm").style.display = 'none';
                document.getElementById("loggedInDialog").style.display = 'flex';
                document.getElementById("loggedInDialogHeader").innerHTML = `Hi ${res.data.username}`;
                // we cant set the value to 5 becasue the min value is 15
                chrome.idle.setDetectionInterval(15)
                chrome.idle.onStateChanged.addListener((state) => newState(state, res.data.username));
            } else {
                document.getElementById("loginForm").style.display = 'flex';
                document.getElementById("loggedInDialog").style.display = 'none';
            }
            document.getElementById("loginButton").addEventListener("click", loginButtonClicked);
            document.getElementById("logoutButton").addEventListener("click", logoutButtonClicked);
        });
    }

    init();

    function loginButtonClicked() {
        document.getElementById("formError").innerHTML = '';
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (!username || !password) {
            document.getElementById("formError").innerHTML = "Username and password is required";
            return;
        }
        if (password !== 'password') {
            document.getElementById("password").value = '';
            document.getElementById("formError").innerHTML = "Username and password is wrong";
            return;
        }
        const data = { username };
        chrome.storage.sync.set({ "data": data }, () => {
            document.getElementById("username").value = '';
            document.getElementById("password").value = '';
            init()
        });
    }

    function logoutButtonClicked() {
        chrome.storage.sync.set({ "data": {} });
        init();
    }
}())



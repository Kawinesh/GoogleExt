(function () {
    "use strict";
    $("body").append(`
      <div id="content_modal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" style="display: none">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center">
            <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div class="mt-2">
                      <p id="content_modal_message" class="text-sm text-gray-500">Are you lost</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button id="content_modal_button_yes" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Yes</button>
                <button id="content_modal_button_no" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `)

    $("#content_modal_button_yes").bind("click", () => {
        window.open("https://help.nickelled.com", "_blank");
        $("#content_modal").css("display", "none");
    });

    $("#content_modal_button_no").bind("click", () => {
        $("#content_modal").css("display", "none");
    });


    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        sendResponse();
        $("#content_modal_message").html(`Are you lost ${request.name}`);
        $("#content_modal").css("display", "block");
    });
}())


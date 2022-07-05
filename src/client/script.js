$(document).ready(function() {
  var headerTitleElement = $("#header h1");
  var entriesElement = $("#guestbook-entries");
  var formElement = $("#guestbook-form");
  var submitElement = $("#guestbook-submit");
  var entryContentElement = $("#guestbook-entry-content");
  var hostAddressElement = $("#guestbook-host-address");

  var appendGuestbookEntries = function() {
    $.getJSON("/api/entries", function(entries) {
      entriesElement.empty();
      $.each(entries, function(key, val) {
        entriesElement.append("<p>" + val.message + "</p>");
      });
    });
  }

  var handleSubmission = function(e) {
    e.preventDefault();
    var entryValue = entryContentElement.val();
    if (entryValue.length > 0) {

      console.log("UTC " + Date.UTC());
      console.log("Now " + Date.now());

      $.ajax({
        url: "/api/entries",
        method: "POST",
        data: {"message": entryValue, timestamp: Date()},
        success: appendGuestbookEntries
      });
      entriesElement.append("<p>...</p>");
        
      entryContentElement.val("")
    }
    return false;
  }

  submitElement.click(handleSubmission);
  formElement.submit(handleSubmission);
  hostAddressElement.append(document.URL);

  // Poll every second.
  (function fetchGuestbook() {
      console.log("Getting list");
      $.getJSON("/api/entries").done(appendGuestbookEntries).always(
        function() {
          setTimeout(fetchGuestbook, 1000);
        });
  })()
});

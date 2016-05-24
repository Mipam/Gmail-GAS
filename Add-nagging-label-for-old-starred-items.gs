/**
 * script source http://blog.rescuetime.com/2013/04/05/automatically-label-lingering-emails-with-this-google-apps-script/
 * Get the "DEAL WITH ME" label, or create it if it doesn't exist
 * This is called by the other two functions, you shouldn't need to call it directly
 */
function _getNaggingLabel() {
  /**
   * If you'd like your label to say something different, modify it here
   */
  var nagging_label_text = "DEAL WITH ME";
  
  var label = GmailApp.getUserLabelByName(nagging_label_text);
  
  if (label == null) {
    var label = GmailApp.createLabel(nagging_label_text);
  }
  
  return label;
}


/**
 * Search for starred items in the inbox that are older than 14 days
 * apply a label called "DEAL WITH ME"
 */
function addNaggingLabels() {
  var label = _getNaggingLabel();
  
  var threads = GmailApp.search('in:inbox label:Starred older_than:14d');
  
  for (var i = 0; i < threads.length; i++) {
    label.addToThread(threads[i]);
  }
}

/**
 * SCAN THROUGH THE "DEAL WITH ME" label and unlabel any items that aren't currently in the inbox
 */
function removeNaggingLabels() {
  var label = _getNaggingLabel();
  
  var threads = GmailApp.search('label:DEAL-WITH-ME');
  
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].isInInbox() == false || threads[i].hasStarredMessages() == false) {
      label.removeFromThread(threads[i]);
    }
  }
}

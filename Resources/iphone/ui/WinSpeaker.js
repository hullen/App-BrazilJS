(function() {
  var Window;

  Window = function(speaker) {
    var headerView, imageProfile, labelCompany, labelName, openTwitter, openTwitterInMiniBrowser, openWebsite, rowDescription, rowTwitter, rowWebsite, self, tableView, ui;
    ui = require("/ui/components");
    self = new ui.createWindow({
      title: L("speaker")
    });
    headerView = Ti.UI.createView({
      height: Ti.UI.SIZE,
      backgroundColor: "transparent"
    });
    imageProfile = Ti.UI.createImageView({
      image: "/images/speakers/" + speaker.picture,
      height: 65,
      width: 65,
      top: 10,
      left: 10,
      borderColor: "#444444",
      borderWidth: 1,
      borderRadius: 4
    });
    headerView.add(imageProfile);
    labelName = Ti.UI.createLabel({
      text: speaker.name,
      left: 85,
      top: 20,
      color: "#000000",
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 1
      },
      font: {
        fontSize: 18,
        fontWeight: "bold"
      }
    });
    headerView.add(labelName);
    labelCompany = Ti.UI.createLabel({
      text: speaker.company,
      left: 85,
      top: 40,
      color: "#333333",
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 1
      },
      font: {
        fontSize: 15
      }
    });
    headerView.add(labelCompany);
    rowWebsite = Ti.UI.createTableViewRow({
      height: 44
    });
    rowWebsite.add(Ti.UI.createLabel({
      text: L("website"),
      left: 10,
      font: {
        fontSize: 16,
        fontWeight: "bold"
      }
    }));
    rowWebsite.add(Ti.UI.createLabel({
      text: speaker.website,
      right: 10,
      font: {
        fontSize: 16
      }
    }));
    rowTwitter = Ti.UI.createTableViewRow({
      height: 44
    });
    rowTwitter.add(Ti.UI.createLabel({
      text: L("twitter"),
      left: 10,
      font: {
        fontSize: 16,
        fontWeight: "bold"
      }
    }));
    rowTwitter.add(Ti.UI.createLabel({
      text: "@" + speaker.twitter_handle,
      right: 10,
      font: {
        fontSize: 16
      }
    }));
    rowDescription = Ti.UI.createTableViewRow({
      selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
    });
    rowDescription.add(Ti.UI.createLabel({
      text: speaker.description,
      width: 280,
      height: Ti.UI.SIZE,
      top: 10,
      bottom: 10,
      ellipsize: false,
      font: {
        fontSize: 16
      }
    }));
    tableView = new ui.createTableView({
      headerView: headerView,
      style: Ti.UI.iPhone.TableViewStyle.GROUPED,
      data: [rowWebsite, rowTwitter, rowDescription]
    });
    self.add(tableView);
    tableView.addEventListener("click", function(e) {
      switch (e.index) {
        case 0:
          return openWebsite();
        case 1:
          return openTwitter();
      }
    });
    openWebsite = function() {
      var MiniBrowser, miniBrowser;
      MiniBrowser = require("/lib/MiniBrowser");
      miniBrowser = new MiniBrowser({
        modal: true,
        url: "http://www." + speaker.website + "/"
      });
      return miniBrowser.open();
    };
    openTwitterInMiniBrowser = function() {
      var MiniBrowser, miniBrowser;
      MiniBrowser = require("/lib/MiniBrowser");
      miniBrowser = new MiniBrowser({
        modal: true,
        url: "http://www.twitter.com/" + speaker.twitter_handle
      });
      return miniBrowser.open();
    };
    openTwitter = function() {
      var canOpenTweetbot, canOpenTwitter, options, tweetbotURL, twitterOptionsDialog, twitterURL;
      canOpenTwitter = false;
      canOpenTweetbot = false;
      options = [];
      twitterURL = "twitter://user?screen_name=" + speaker.twitter_handle;
      tweetbotURL = "tweetbot:///user_profile/" + speaker.twitter_handle;
      if (Ti.Platform.canOpenURL(tweetbotURL)) {
        canOpenTweetbot = true;
        options.push(L("open_tweetbot"));
      }
      if (Ti.Platform.canOpenURL(twitterURL)) {
        canOpenTwitter = true;
        options.push(L("open_twitter"));
      }
      options.push(L("open_in_browser"));
      options.push(L("cancel"));
      twitterOptionsDialog = Ti.UI.createOptionDialog({
        title: L("how_want_you_open"),
        options: options,
        destructive: options.length - 1
      });
      twitterOptionsDialog.show();
      return twitterOptionsDialog.addEventListener("click", function(e) {
        switch (e.index) {
          case 0:
            if (canOpenTweetbot) {
              return Ti.Platform.openURL(tweetbotURL);
            } else if (canOpenTwitter) {
              return Ti.Platform.openURL(twitterURL);
            } else {
              return openTwitterInMiniBrowser();
            }
            break;
          case 1:
            if (canOpenTweetbot && canOpenTwitter) {
              return Ti.Platform.openURL(twitterURL);
            } else {
              if (canOpenTweetbot) return openTwitterInMiniBrowser();
            }
            break;
          case 2:
            if (canOpenTweetbot && canOpenTwitter) {
              return openTwitterInMiniBrowser();
            }
        }
      });
    };
    return self;
  };

  module.exports = Window;

}).call(this);

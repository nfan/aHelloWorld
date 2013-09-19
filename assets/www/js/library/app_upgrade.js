define(['jquery', 'underscore',
        'CRMApp'],
    function($, _, CRMApp) {
       var app_upgrade = function() {

            this.server_version = NaN;
            this.package_url = "/images/package";
            
       
            var config = CRMApp.getInstance();
            if (typeof config.get('base_url') != 'undefined') {
                this.package_url = config.get('base_url') + this.package_url;
            }
       }
       
       //check remote version and start upgrade if remote is new version
       app_upgrade.prototype.check = function(upgraded_callback) {
       
            if (typeof upgraded_callback != 'undefined') {
                this.upgraded_callback = upgraded_callback;
            }
       
            var config = CRMApp.getInstance();

       
            console.log("==local version:" + config.get('version'));
       
            var that = this;
            $.ajax(this.package_url+"/version")
                .done(
                    function(data) {
                      data = $.trim(data);
                      that.server_version = data;
                      
                      console.log("==remote version: "+that.server_version);
                      
                      if ( parseFloat(that.server_version) != NaN && parseFloat(that.server_version)  != parseFloat(config.get('version'))) {
                        console.log("==upgrading");
                        that.upgrade();
                      }
                    }
                ).fail(
                    function(xhr, status) {
                       console.log("==fail: "+status);
                    }
                ).always(

                );
       
       }
       
       function fail(error) { console.log(JSON.stringify(error));}
       
       //upgraded successfully
       app_upgrade.prototype.upgraded = function(urls) {
       
            var config = CRMApp.getInstance();
            config.set('version', this.server_version);
            console.log("==upgraded to version: " + config.get('version'));
            if (typeof this.upgraded_callback != 'undefined') {
                this.upgraded_callback(urls);
            }
       }
       
       //upgrade to local
       app_upgrade.prototype.upgrade = function() {
       
            console.log("==remote list: "+this.package_url+"/"+this.server_version+"/list");
       
            var that = this;
            $.ajax(that.package_url+"/"+that.server_version+"/list").done(
                    function(data) {
                        data = $.trim(data);
                        console.log("==remote file list: "+data);
                      
                        var list = data.split("\n");
                        var downloaded = 0;
                        var urls = new Array();
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                            function onFileSystemSuccess(fileSystem) {
                                _.each(list, function(file){
                                    var path = that.server_version+"/"+file;
                                    console.log("==remote file: "+path);
                                    
                                    //create parent folder(s)
                                    var folders = path.split("/");
                                    var tmp = "";
                                    for(var i = 0;i<folders.length - 1;i++) {
                                       if (tmp == "") {
                                        tmp=folders[i];
                                       } else {
                                        tmp+="/"+folders[i];
                                       }
                                       fileSystem.root.getDirectory(tmp, {create: true});
                                       
                                    }
                                    
                                    //download file
                                    fileSystem.root.getFile(
                                        path, {create: true, exclusive: false},
                                        function gotFileEntry(fileEntry) {
                                            var sPath = fileEntry.fullPath;
                                            console.log("==local file: "+sPath);
                                            var fileTransfer = new FileTransfer();
                                            fileEntry.remove();
                                            fileTransfer.download(
                                                that.package_url+"/"+path,
                                                sPath,
                                                function(theFile) {
                                                    console.log("==download complete: " + theFile.toURL());

                                                    urls[downloaded] = theFile.toURL();
                                                    downloaded++;
                                                                  
                                                    if (downloaded == list.length) {
                                                        that.upgraded(urls);
                                                    }
                                                },
                                                function(error) {
                                                    console.log("==download error source " + error.source);
                                                    console.log("==download error target " + error.target);
                                                    console.log("==download error code: " + error.code);
                                                }
                                            );
                                    }, fail);
                                });
                            }
                        , fail);
                      }
                ).fail(
                    function(xhr, status) {
                       console.log("==fail: "+status);
                    }
                ).always(
       
                );
       }
       
       return app_upgrade;
    }
);
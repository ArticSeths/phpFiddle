$(document).on("click", ".folder a", function(){
    var path = $(this).closest("div").attr("data-name");
    var self = $(this).closest("div");
    $.ajax({
        type: "get",
        dataType: "json",
        url: "./get/dirContents.php?p=" + project + "&path=" + escape(path),
        success: function(data){
            var files = data["files"];
            var folders = data["folders"];
            str = "<div class='dir-content'>";
            for(var i in folders){
                str += "<div class='folder' data-name='" + folders[i] + "'><a href=''>" + i + "</a></div>";
            }
            for(i in files){
                str += "<div class='file' data-name='" + files[i] + "'><a href=''>" + i + "</a></div>";
            }
            str += "</div>";
            if(self.find("div.dir-content").length === 0){
                self.append(str);
            }else{
                self.find("div.dir-content").remove();
                self.append(str);
            }
        }
    });
    return false;
});

$(document).on("click", ".file a", function(){
    var path = $(this).closest("div").attr("data-name");
    var self = $(this).closest("div");
    $.ajax({
        type: "get",
        url: "./get/fileContents.php?p=" + project + "&file=" + escape(path),
        success: function(code){
            editor.setValue(code);
            var pos = path.lastIndexOf(".");
            setMode(path.substr(pos + 1));
        }
    });
    return false;
});

function setMode(mode){
    switch(mode){
        case "html":
            editor.setOption("mode", "text/html");
            break;
        case "css":
            editor.setOption("mode", "text/css");
            break;
        case "javascript":
            editor.setOption("mode", "text/javascript");
            break;
        case "php":
            editor.setOption("mode", "php");
            break;
        case "plain text":
            editor.setOption("mode", "text/plain");
            break;
        default:
            editor.setOption("mode", "text/plain");
    }
}
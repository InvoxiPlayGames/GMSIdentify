var GMSIdentify_VersionDB = [];
var GMSIdentify_DBLoaded = false;

// imports a CSV-format database
function GMSIdentify_ImportDatabase(text) {
    GMSIdentify_VersionDB = [];
    var textsplit = text.split("\r\n");
    var keys = textsplit[0].split(",");
    // skip 2 lines (key line and metadata line)
    for (var i = 2; i < textsplit.length; i++) {
        var values = textsplit[i].split(",");
        var newObject = {};
        for (var j = 0; j < values.length; j++) {
            newObject[keys[j]] = values[j];
        }
        GMSIdentify_VersionDB.push(newObject);
    }
    GMSIdentify_DBLoaded = true;
    return GMSIdentify_VersionDB;
}

var GMSIdentify_Error = false;
var GMSIdentify_ErrorText = "";
function GMSIdentify_HasError() {
    return GMSIdentify_Error;
}
function GMSIdentify_GetError() {
    return GMSIdentify_ErrorText;
}

var GMSIdentify_Results = {};
var GMSIdentify_ResultsGot = false;
function GMSIdentify_HasResults() {
    return GMSIdentify_ResultsGot;
}
function GMSIdentify_GetResults() {
    return GMSIdentify_Results;
}

// resets all globals except version ID
function GMSIdentify_ResetIdentify() {
    GMSIdentify_Error = false;
    GMSIdentify_ErrorText = "";
    GMSIdentify_Results = {};
    GMSIdentify_ResultsGot = false;
}

function GMSIdentify_ReadInt32(buf, offset) {
    // reads a little-endian 32-bit integer
    return (buf[offset + 3] << 24) | (buf[offset + 2] << 16) | (buf[offset + 1] << 8) | (buf[offset]);
}

function GMSIdentify_FromArrayBuffer(ab) {
    // gets a gamemake
    try {
        var u8a = new Uint8Array(ab);
        // verify the magic to be a PE
        if (GMSIdentify_ReadInt32(u8a, 0) != 0x00905A4D) {
            throw "File provided wasn't an EXE file.";
        }
        // get the offset to the actual PE header
        var coffOffset = GMSIdentify_ReadInt32(u8a, 0x3C);
        // verify that's got the PE signature
        if (GMSIdentify_ReadInt32(u8a, coffOffset + 0x0) != 0x00004550) {
            throw "File provided wasn't a PE file.";
        }
        // get the PE timestamp
        var timestamp = GMSIdentify_ReadInt32(u8a, coffOffset + 0x8);
        GMSIdentify_Results["timestamp"] = timestamp;
        // look up the timestamp in the version table
        var tsString = timestamp.toString();
        var versionMatch = GMSIdentify_VersionDB.find((a) => a.timestamp == tsString);
        if (versionMatch != undefined) {
            GMSIdentify_Results["match"] = versionMatch;
            GMSIdentify_Results["matched"] = true;
        }
        GMSIdentify_ResultsGot = true;
    } catch(ex) {
        GMSIdentify_Error = true;
        GMSIdentify_ErrorText = ex;
        return;
    }
}

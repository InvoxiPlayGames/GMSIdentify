# GMSIdentify

A project/database of sorts to make identifying which GMS version a given
GameMaker (VM) game was built with easier, especially with GMS2 and upwards
not including the runtime/build tools version in the data files. (This will not
work with games compiled with YYC or GMRT.)

**This project is not affiliated with or endorsed by YoYo Games or Opera Norway
AS.**

This project is intended to aid in legitimate reverse engineering and legal
modification to games made with GMS.

Note that some games may use a custom compiled version of the runtime, even if
they use VM code. These versions won't be included in the database.

## Website / Usage

A website is available at
https://invoxiplaygames.github.io/GMSIdentify/index.html
with a JavaScript implementation of looking up the GMS version from the PE
timestamp of a given EXE. It runs entirely locally in the browser - no data is
sent to/from a server.

## Database

### Windows

A database of information (PE timestamp and .text segment hash) for Windows GMS
runners is available in "runnerinfo_windows.csv" and can be referenced directly
by URL:

https://invoxiplaygames.github.io/GMSIdentify/runnerinfo_windows.csv

The database will always have an entry with "METADATA" as its version field.
The "timestamp" of this entry will be the Unix timestamp the database was last
updated. Other fields of this are reserved for notes and updates.

No automation is currently set up for this. 

### Contributing

The database is not complete by any means.
If you have archived versions of runtime update feeds and corresponding ZIP
files, please let me know! Currently looking to backfill Beta and NuBeta.

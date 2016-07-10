/*
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// These are all variables needed at some point during our work.
// They keep track of the JSON we have received, storing it in the browser,
// Thus lightening the load on the backend (caching and such)

var _VERSION_ = "0.9" // Current version (as far as we know)
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var d_ppp = 15; // results per page
var c_page = 0; // current page position for list view
var open_emails = [] // cache index for loaded emails
var list_year = {}
var current_retention = "lte=1M" // default timespan for list view
var current_cal_min = 1997 // don't go further back than 1997 in case everything blows up, date-wise
var keywords = ""
var current_thread = 0 // marker for list view; currently open thread/email
var current_thread_mids = {} // duplicate guard for threading
var saved_emails = {} // JSON cache for emails
var current_query = "" // currently active search query
var old_json = {} // pointer to previously loaded JSON object
var all_lists = {}
var current_json = {} // pointer to currently loaded JSON
var current_thread_json = {}
var current_flat_json = {}
var current_email_msgs = []
var current_reply_eid = null
var last_opened_email = null
var firstVisit = true
var global_deep = false
var old_state = {}
var nest = ""
var xlist = ""
var domlist = {}
var compose_headers = {}
var login = {}
var xyz
var start = new Date().getTime()
var latestEmailInThread = 0
var composeType = "reply"
var gxdomain = ""
var fl = null
var kiddos = [] // DOM tree for traverse functions
var pending_urls = {} // URL list for GetAsync's support functions (such as the spinner)
var pb_refresh = 0
var treeview_guard = {}
var mbox_month = null
var storageAvailable = false

try {
    if (typeof(window.sessionStorage) !== "undefined") {
        window.sessionStorage.setItem("pm_test", "1")
        storageAvailable = true
    }
} catch(e) {
    storageAvailable = false
}
// Links from viewmode to the function that handles them
var viewModes = {
    threaded: {
        email: loadEmails_threaded,
        list: loadList_threaded,
        description: 'Grouped by threads'
    },
    flat: {
        email: loadEmails_flat,
        list: loadList_flat,
        description: 'Flat list (one email per line)'
    },
    treeview: {
        email: loadEmails_flat,
        list: loadList_treeview,
        description: 'Threaded with treeview'
    },
}

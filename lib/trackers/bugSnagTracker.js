const fetch = require('node-fetch');

function BugSnagTracker() {
    //auth token or credentials

    //organization name/id
    //project name /id
    // stage

    this.getOrganizationId = async function (organizationName) {
        let apiUrl = `https://api.bugsnag.com/user/organizations?auth_token=${token}`;
        const response = await fetch(apiUrl);

    }

    this.getProjectId = async function (organizationId, name, stage) {
        let apiUrl = `https://api.bugsnag.com/organizations/${organizationId}/projects?auth_token=${token}`
        const response = await fetch(apiUrl);
    }

    this.getErrors = async function () {
        //let isoDateTime = 
        let apiUrl = `https://api.bugsnag.com/projects/${projectId}/errors?auth_token=${token}
        &filters[app.release_stage][][type]=eq&filters[app.release_stage][][value]=${stage}
        &filters[event.since][][type]=eq&filters[event.since][][value]=${isoDateTime}`;
        const response = await fetch(apiUrl);
    }
    this.track = function () {

    }


}

module.exports = BugSnagTracker;
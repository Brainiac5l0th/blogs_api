/*
 *
 *
 ------->Title: generate html(warning)
 ->Description: this file is to generate html warning content.
 ------>Author: Shawon Talukder
 -------->Date: 07/02/2023
 *
 *
 */

const WarningHTML = (message, blogTitle) => {
    return `<p>Dear concern,<br/>Hope you are doing great? This mail is to inform you that in your blog titled <strong>${blogTitle}</strong> there is something that deviate our rules and regulations.<br/>
    <div class="text-align:center border:1px solid black;">
        <p>More specificly: 
            <span class="color:tomato; opacity: 0.8;">${message}</span>
        </p>
    </div>
    <p>We are changing your <strong>blog status to "draft"</strong>.Please check the issue.And publish the blog again! Thanks for being with us.</p>
    </p><br/>
    <h5>Best Regards,<br/>Admin, Vuex-blogs.</h5>`
}

//export module.
module.exports = {
    WarningHTML
}
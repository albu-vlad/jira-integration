webpackJsonp([1],{"2fDl":function(t,s){},"7zck":function(t,s){},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("woOf"),a=e.n(i),n=e("7+uW"),r=e("mtWM"),o=e.n(r),u={props:{issue:{type:String},user_name:{type:String},user_email:{type:String},user_pass:{type:String},issue_status:{type:Number}},data:function(){return{now:new Date,state:"stopped",interval:null,workflow:null,submitId:"",active:!1,startText:"Start",pauseText:"Pause",seconds:"00",minutes:"00",hours:"00"}},created:function(){Date.prototype.toIsoString=function(){var t=-this.getTimezoneOffset(),s=function(t){var s=Math.floor(Math.abs(t));return(s<10?"0":"")+s};return this.getFullYear()+"-"+s(this.getMonth()+1)+"-"+s(this.getDate())+"T"+s(this.getHours())+":"+s(this.getMinutes())+":"+s(this.getSeconds())+".000-"+s(t/60)+":"+s(t%60)}},mounted:function(){var t="https://epointproject.atlassian.net/rest/api/2/issue/"+this.issue+"/transitions";this.getJira(t)},destroyed:function(){clearInterval(this.interval)},computed:{statusItems:function(){var t=[];if(null!==this.workflow)return this.workflow.forEach(function(s){var e={};e.status=s.name,e.id=s.id,e.statusId=s.to.statusCategory.id,t.push(e)}),t},selected:{get:function(){if(this.statusItems){var t=this;return this.statusItems.filter(function(s){return s.statusId===t.issue_status})[0]}},set:function(t){this.submitId=t}}},methods:{timerSwitch:function(){!1===this.active?(this.active=!0,this.timeStart()):(this.active=!1,this.timeStop())},timeStart:function(){clearInterval(this.interval),this.interval=setInterval(this.startTimer,1e3)},timeStop:function(){clearInterval(this.interval)},timeReset:function(){clearInterval(this.interval),this.seconds="00",this.minutes="00",this.hours="00"},startTimer:function(){this.seconds++,this.seconds<=9&&(this.seconds="0"+this.seconds),this.seconds>60&&(this.minutes++,this.seconds="00",this.minutes<=9&&(this.minutes="0"+this.minutes)),this.minutes>60&&(this.hours++,this.minutes="00",this.minutes<=9&&(this.hours="0"+this.hours))},close:function(){this.$data.state="stopped";var t=60*parseInt(this.hours),s=parseInt(this.minutes),e={transition:{id:this.submitId.id}},i={timeSpent:t+s+"m",started:this.now.toIsoString},a="https://epointproject.atlassian.net/rest/api/2/issue/"+this.issue+"/transitions",n="https://epointproject.atlassian.net/rest/api/2/issue/"+this.issue+"/worklog";this.submitId.id&&this.postJira(a,e),t+s>0&&this.postJira(n,i)},updateCurrentTime:function(){"started"===this.$data.state&&(this.currentTime=Date.now())},getJira:function(t){var s=this,e=window.btoa(this.user_email+":"+this.user_pass);o.a.get(t,{headers:{"Content-Type":"application/json",Authorization:"Basic "+e,"X-Atlassian-Token":"no-check"}}).then(function(t){return s.workflow=t.data.transitions})},postJira:function(t,s){var e=window.btoa(this.user_email+":"+this.user_pass);o.a.post(t,s,{headers:{"Content-Type":"application/json",Authorization:"Basic "+e,"X-Atlassian-Token":"no-check"}})}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"counter-block"},[e("div",{staticClass:"block"},[e("p",{staticClass:"digit"},[t._v(t._s(this.hours)+":"+t._s(this.minutes)+":"+t._s(this.seconds))]),t._v(" "),e("div",{staticClass:"counter-block"},[e("v-btn",{attrs:{flat:"",color:"orange"},on:{click:t.timerSwitch}},[t._v(t._s(!1===t.active?t.startText:t.pauseText))]),t._v(" "),e("v-btn",{attrs:{flat:"",color:"orange"},on:{click:t.timeReset}},[t._v("Reset")]),t._v(" "),e("v-btn",{attrs:{flat:"",color:"orange"},on:{click:t.close}},[t._v("Close")])],1)]),t._v(" "),e("div",{staticClass:"block"},[t.selected?e("v-select",{attrs:{hint:t.selected.status+", "+t.selected.id,items:t.statusItems,"item-text":"status","item-value":"id",label:"Select","persistent-hint":"","return-object":"","single-line":""},model:{value:t.selected,callback:function(s){t.selected=s},expression:"selected"}}):t._e()],1)])},staticRenderFns:[]};var l={name:"App",data:function(){return{info:null,right:!0,rightDrawer:!1,projects:[],state:"PAUSED",startTime:Date.now(),currentTime:Date.now(),interval:null,countTime:[]}},components:{StopWatch:e("VU/8")(u,c,!1,function(t){e("O9Vh")},"data-v-4fbc184e",null).exports},mounted:function(){var t=this,s=this.api_url,e=window.btoa(this.user_email+":"+this.user_pass);o.a.get(s,{headers:{"Content-Type":"application/json",Authorization:"Basic "+e,"X-Atlassian-Token":"no-check"}}).then(function(s){return t.info=s}),this.interval=setInterval(this.updateCurrentTime,1e3)},destroyed:function(){clearInterval(this.interval)},computed:{projectList:function(){if(null!==this.info){var t=this.info.data.issues,s=[];return t.forEach(function(t){var e=t.fields.project.id,i={};i.name=t.fields.project.name,i.avatar=t.fields.project.avatarUrls["24x24"],i.issues=[],s[e]=i}),t.forEach(function(t){var e=t.fields.project.id;s[e]&&s[e].issues.push(t)}),this.projects=s,this.projects}}},props:{user_name:{type:String,required:!1},user_email:{type:String,required:!1},user_pass:{type:String,required:!1},api_url:{type:String,required:!1},rendered_fields:{type:String,required:!1},issue_status:{type:String,required:!1}}},d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"class-issue-tracker-app",attrs:{id:"issue-tracker-app"}},[e("v-app",{staticClass:"main-app"},[e("v-content",[e("v-layout",{attrs:{"align-start":"","justify-end":"",row:""}},[e("v-btn",{staticClass:"jira-button",attrs:{color:"pink",dark:""},on:{click:function(s){s.stopPropagation(),t.rightDrawer=!t.rightDrawer}}},[t._v("\n          Jira\n        ")])],1)],1),t._v(" "),e("v-navigation-drawer",{staticClass:"v-drawer",attrs:{temporary:"",right:t.right,width:500,fixed:"",app:""},model:{value:t.rightDrawer,callback:function(s){t.rightDrawer=s},expression:"rightDrawer"}},[e("v-list",[e("v-list-tile",[e("v-list-tile-title",{staticClass:"tile-title text-xs-center"},[e("h5",[t._v("\n              Assigned Projects\n            ")])])],1),t._v(" "),e("v-divider"),t._v(" "),e("v-expansion-panel",{attrs:{focusable:""}},t._l(t.projectList,function(s,i){return s?e("v-expansion-panel-content",{key:i},[e("div",{attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"project-title"},[e("span",[e("v-list-tile-avatar",{attrs:{size:24}},[e("img",{attrs:{src:s.avatar}})])],1),t._v(" "),e("span",[t._v("\n              "+t._s(s.name)+"\n            ")]),t._v(" "),e("span",[e("v-badge",{attrs:{color:"orange",rignt:""}},[e("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(" "+t._s(s.issues.length)+" ")])])],1)])]),t._v(" "),t._l(s.issues,function(i,a){return e("v-list-tile",{key:a,staticClass:"card_title",on:{click:function(t){}}},[e("v-list-tile-content",[e("v-layout",[e("v-flex",{attrs:{xs12:"",sm12:""}},[e("v-card",[e("v-card-title",{attrs:{"primary-title":""}},[e("div",{staticClass:"issue-details"},[e("span",{staticClass:"summary"},[e("h3",[t._v(t._s(i.key)+": "+t._s(i.fields.summary)+" ")])]),t._v(" "),e("div",{staticClass:"description",domProps:{innerHTML:t._s(i.renderedFields.description)}})]),t._v(" "),[e("div",{staticClass:"stopwatch"},[e("StopWatch",{attrs:{issue:i.key,issue_status:i.fields.status.statusCategory.id,user_name:t.user_name,user_email:t.user_email,user_pass:t.user_pass}})],1)]],2),t._v(" "),a+1<s.issues.length?e("v-divider",{key:"divider-"+a}):t._e()],1)],1)],1)],1)],1)})],2):t._e()}))],1)],1)],1)],1)},staticRenderFns:[]};var h=e("VU/8")(l,d,!1,function(t){e("2fDl"),e("YIUj")},"data-v-1afefbf3",null).exports,p=e("3EgV"),v=e.n(p);e("7zck");n.default.use(v.a),n.default.config.productionTip=!1;var f=null;f=e("lBvi");var m=new n.default({el:"#app",data:{config:f},render:function(t){return t(h,{props:{user_email:this.config.user_email,user_pass:this.config.user_pass,api_url:this.config.api_url}})},created:function(){window.issue_config&&a()(this.config,window.issue_config)}});window.issue_tracker=m},O9Vh:function(t,s){},YIUj:function(t,s){},lBvi:function(t,s){t.exports={user_email:null,user_pass:null,api_url:null}}},["NHnr"]);
//# sourceMappingURL=app.18d5c6899f02de34e29a.js.map
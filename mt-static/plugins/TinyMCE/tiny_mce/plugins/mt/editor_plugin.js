(function(a){a.each(["plugin","advanced"],function(){tinymce.ScriptLoader.add(tinymce.PluginManager.urls.mt+"/langs/"+this+".js")});tinymce.Editor.prototype.addMTButton=function(d,e){var c=this;var f={};var b=e.onclickFunctions;if(b){e.onclick=function(){var h=c.mtEditorStatus.mode;var g=b[h];if(typeof(g)=="string"){c.mtProxies[h].execCommand(g)}else{g.apply(c,arguments)}if(h=="source"){c.onMTSourceButtonClick.dispatch(c,c.controlManager)}};for(k in b){f[k]=1}}else{f={wysiwyg:1,source:1}}if(!e.isSupported){e.isSupported=function(i,h){if(!f[i]){return false}if(b&&i=="source"){var g=b[i];if(typeof(g)=="string"){return c.mtProxies.source.isSupported(g,h)}else{return true}}else{return true}}}if(typeof(c.mtButtons)=="undefined"){c.mtButtons={}}c.mtButtons[d]=e;return c.addButton(d,e)};tinymce.create("tinymce.ui.MTTextButton:tinymce.ui.Button",{renderHTML:function(){var e=tinymce.DOM;var f=this.classPrefix,d=this.settings,c,b;b=e.encode(d.label||"");c='<a role="button" id="'+this.id+'" href="javascript:;" class="mceMTTextButton '+f+" "+f+"Enabled "+d["class"]+(b?" "+f+"Labeled":"")+'" onmousedown="return false;" onclick="return false;" aria-labelledby="'+this.id+'_voice" title="'+e.encode(d.title)+'">';c+=d.text;c+="</a>";return c}});tinymce.create("tinymce.plugins.MovableType",{buttonSettings:"",_initButtonSettings:function(b){var e=this;e.buttonIDs={};var d={source:{},wysiwyg:{}};var c=1;a.each(["common","source","wysiwyg"],function(h,f){var l="plugin_mt_"+f+"_buttons";for(var g=1;b.settings[l+g];g++){e.buttonSettings+=(e.buttonSettings?",":"")+b.settings[l+g];b.settings["theme_advanced_buttons"+c]=b.theme.settings["theme_advanced_buttons"+c]=b.settings[l+g];if(f=="common"){d.source[c-1]=d.wysiwyg[c-1]=1}else{d[f][c-1]=1}c++}});return d},_setupIframeStatus:function(b){b.onPostRender.add(function(){var h=a(window);var d=a(b.getContainer());var g=d.find("iframe");var f=a(b.getWin());var c=".tinymce_mt_iframe_status_"+b.id;f.focus(function(){g.addClass("state-focus")}).blur(function(){g.removeClass("state-focus")});function e(){f.bind("mousemove"+c,function(){f.unbind("mousemove"+c);g.addClass("state-hover");h.bind("mousemove"+c,function(){h.unbind("mousemove"+c);g.removeClass("state-hover");e()})})}e()})},_setupExplicitButtonActivation:function(b){b.onPostRender.add(function(){var f=window;var d="$TinyMCEMTButtonActive";var e=a(b.getContainer());var c=".mceButton, .mceListBoxEnabled, .mceSplitButtonEnabled a";e.find(c).mousedown(function(){f[d]=a(this).addClass("psedo-active")});a.each([f.document,b.getWin().document],function(){var g=this;var h=".tinymce_mt_button_activate";var i="mouseup"+h+" touchend"+h;a(g).unbind(i).bind(i,function(){if(f[d]){f[d].removeClass("psedo-active");f[d]=null}})})})},init:function(h,g){var e=this;var q=h.id;var c=q.length;var s=a("#blog-id").val()||0;var d={};var p=[];var r=null;var w=null;var f={};var v=this._initButtonSettings(h);var l={};h.mtProxies=d;h.mtEditorStatus={mode:"wysiwyg",format:"richtext"};function t(z,y){var x=z+"-"+y;if(!f[x]){f[x]={};a.each(h.mtButtons,function(A,B){if(B.isSupported(z,y)){f[x][A]=B}})}return f[x]}function b(){var x=h.mtEditorStatus;a.each(p,function(B,A){r.find(".mce_"+A).css({display:""}).removeClass("mce_mt_button_hidden");h.controlManager.setDisabled(this,false)});p=[];var y=t(x.mode,x.format);function z(A){if(!y[A]){r.find(".mce_"+A).css({display:"none"}).addClass("mce_mt_button_hidden");p.push(A)}}if(x.mode=="source"){d.source.setFormat(x.format);a.each(h.controlManager.controls,function(A,B){if(!B.classPrefix){return}z(A.substr(c+1))})}else{a.each(h.mtButtons,function(A,B){z(A)})}a("#"+q+"_toolbargroup > span > table").each(function(A){if(v[x.mode][A]){a(this).show()}else{a(this).hide()}})}function u(y,x){a.fn.mtDialog.open(ScriptURI+"?__mode="+y+"&amp;"+x)}function i(x){a.each(h.windowManager.windows,function(z,y){var A=y.iframeElement;a("#"+A.id).load(function(){var C=this.contentWindow;var B={"$contents":a(this).contents(),window:C};x(B,function(){C.tinyMCEPopup.close();if(tinymce.isWebKit){a("#convert_breaks").focus()}d.source.focus()})})})}function o(z,x){function y(){var A=a(this);d.source.execCommand("createLink",null,A.find("#href").val(),{target:A.find("#target_list").val(),title:A.find("#linktitle").val()});x()}z["$contents"].find("form").attr("onsubmit","").submit(y);if(!d.source.isSupported("createLink",h.mtEditorStatus.format,"target")){z["$contents"].find("#targetlistlabel").closest("tr").hide()}}function n(A,y){function x(C,E,D,F,B){if(E=="mceInsertContent"){d.source.editor.insertContent(F);B.terminate=true}}function z(){h.onBeforeExecCommand.add(x);A.window.TemplateDialog.insert();h.onBeforeExecCommand.remove(x)}setTimeout(function(){A["$contents"].find("form").attr("onsubmit","").submit(z)},0)}function m(y,x){a.each(h.mtButtons,function(z,A){var B;if(A.onclickFunctions&&(B=A.onclickFunctions["source"])&&(typeof(B)=="string")&&(e.buttonSettings.indexOf(z)!=-1)){l[z]=B}})}function j(y,x){a.each(l,function(z,A){x.setActive(z,y.mtProxies.source.isStateActive(A))})}h.onInit.add(function(){r=a(h.getContainer());b();m();h.theme.resizeBy(0,0)});h.onPreInit.add(function(){var y="data-mce-mt-",x=new RegExp("^"+y),z='javascript:void("mce-mt-event-placeholer");return false';h.parser.addAttributeFilter([/^on|action/],function(A,B){var C,E,D=y+B;for(C=0;C<A.length;C++){E=A[C];E.attr(D,E.attr(B));E.attr(B,z)}});h.serializer.addAttributeFilter([x],function(A,D){var C,E,F,G,B=D.substring(y.length);for(C=0;C<A.length;C++){E=A[C];G=E.attr(B);F=E.attr(D);if(G===z){if(!(F&&F.length>0)){F=null}E.attr(B,F)}E.attr(D,null)}});h.parser.addNodeFilter("#comment,#cdata",function(A,B){var C,D;for(C=0;C<A.length;C++){D=A[C];D.value=escape(D.value)}});h.serializer.addNodeFilter("#comment",function(A,B){var C,D;for(C=0;C<A.length;C++){D=A[C];D.value=unescape(D.value);if(D.value.indexOf("[CDATA[")===0){D.name="#cdata";D.type=4;D.value=D.value.replace(/^\[CDATA\[|\]\]$/g,"")}}})});if(h.settings.plugin_mt_tainted_input&&tinymce.isIE){h.onPreInit.add(function(){var z="data-mce-mtie-",A="-mt-placeholder:auto;",y="mce-mt-",x=new RegExp("^"+y);h.parser.addNodeFilter("link",function(B,C){var D,E;for(D=0;D<B.length;D++){E=B[D];a.each(["type","rel"],function(G,F){var H=E.attr(F);if(H){E.attr(F,y+H)}})}});h.parser.addNodeFilter("style",function(B,C){var D,E;for(D=0;D<B.length;D++){E=B[D];E.attr("type",y+(E.attr("type")||"text/css"))}});h.serializer.addNodeFilter("link,style",function(B,C){var D,E,F;for(D=0;D<B.length;D++){E=B[D];a.each(["type","rel"],function(H,G){var I=E.attr(G);if(I){E.attr(G,I.replace(x,""))}})}});h.parser.addAttributeFilter("style",function(B,C){var D,F,E=z+C;for(D=0;D<B.length;D++){F=B[D];F.attr(E,F.attr(C));F.attr(C,A)}});h.serializer.addAttributeFilter(z+"style",function(B,E){var D,F,G,H,C=E.substring(z.length);for(D=0;D<B.length;D++){F=B[D];H=F.attr(C);G=F.attr(E);if(H===A){if(!(G&&G.length>0)){G=null}F.attr(C,G)}F.attr(E,null)}})})}this._setupExplicitButtonActivation(h);this._setupIframeStatus(h);h.addCommand("mtGetStatus",function(){return h.mtEditorStatus});h.addCommand("mtSetStatus",function(x){a.extend(h.mtEditorStatus,x);b()});h.addCommand("mtGetProxies",function(){return d});h.addCommand("mtSetProxies",function(x){a.extend(d,x)});h.addCommand("mtRestoreBookmark",function(x){if(!x){x=w}if(x){h.selection.moveToBookmark(w)}});h.addCommand("mtSaveBookmark",function(){return w=h.selection.getBookmark()});a(window).bind("dialogDisposed",function(){if(w){h.selection.moveToBookmark(w)}w=null});h.addButton("mt_insert_html",{title:"mt.insert_html",onclick:function(){h.windowManager.open({file:g+"/insert_html.html",width:430,height:335,inline:1},{plugin_url:g})}});h.addMTButton("mt_insert_image",{title:"mt.insert_image",onclick:function(){h.execCommand("mtSaveBookmark");u("dialog_list_asset","_type=asset&amp;edit_field="+q+"&amp;blog_id="+s+"&amp;dialog_view=1&amp;filter=class&amp;filter_val=image")}});h.addMTButton("mt_insert_file",{title:"mt.insert_file",onclick:function(){h.execCommand("mtSaveBookmark");u("dialog_list_asset","_type=asset&amp;edit_field="+q+"&amp;blog_id="+s+"&amp;dialog_view=1")}});h.addMTButton("mt_source_bold",{title:"mt.source_bold",text:"strong",mtButtonClass:"text",onclickFunctions:{source:"bold"}});h.addMTButton("mt_source_italic",{title:"mt.source_italic",text:"em",mtButtonClass:"text",onclickFunctions:{source:"italic"}});h.addMTButton("mt_source_blockquote",{title:"mt.source_blockquote",text:"blockquote",mtButtonClass:"text",onclickFunctions:{source:"blockquote"}});h.addMTButton("mt_source_unordered_list",{title:"mt.source_unordered_list",text:"ul",mtButtonClass:"text",onclickFunctions:{source:"insertUnorderedList"}});h.addMTButton("mt_source_ordered_list",{title:"mt.source_ordered_list",text:"ol",mtButtonClass:"text",onclickFunctions:{source:"insertOrderedList"}});h.addMTButton("mt_source_list_item",{title:"mt.source_list_item",text:"li",mtButtonClass:"text",onclickFunctions:{source:"insertListItem"}});h.addMTButton("mt_source_link",{title:"mt.insert_link",onclickFunctions:{source:function(y,x,z){tinymce._setActive(h);this.theme._mceLink.apply(this.theme);i(o)}}});h.addMTButton("mt_source_template",{title:"template.desc",onclickFunctions:{source:function(y,x,z){tinymce._setActive(h);h.execCommand("mceTemplate");i(n)}}});h.addMTButton("mt_source_mode",{title:"mt.source_mode",onclickFunctions:{wysiwyg:function(){h.execCommand("mtSetFormat","none.tinymce_temp")},source:function(){h.execCommand("mtSetFormat","richtext")}}});if(!h.onMTSourceButtonClick){h.onMTSourceButtonClick=new tinymce.util.Dispatcher(h)}h.onMTSourceButtonClick.add(j);h.onNodeChange.add(function(z,x,D,C,y){var A=z.mtEditorStatus;if(z.mtEditorStatus.mode=="source"&&z.mtEditorStatus.format!="none.tinymce_temp"){a("#"+q+"_mt_source_mode").css("display","none")}else{a("#"+q+"_mt_source_mode").css("display","")}var B=z.mtEditorStatus.mode=="source"&&z.mtEditorStatus.format=="none.tinymce_temp";x.setActive("mt_source_mode",B);if(!z.mtProxies.source){return}j(z,z.controlManager)})},createControl:function(d,b){var g=b.editor;var h=g.buttons[d];if((d=="mt_insert_image")||(d=="mt_insert_file")){if(!this.buttonIDs[d]){this.buttonIDs[d]=[]}var i=d+"_"+this.buttonIDs[d].length;this.buttonIDs[d].push(i);return b.createButton(i,a.extend({},h,{"class":"mce_"+d}))}if(h&&h.mtButtonClass){var f,c,e;switch(h.mtButtonClass){case"text":c=tinymce.ui.MTTextButton;break;default:throw new Error("Not implemented:"+h.mtButtonClass)}if(b._cls.button){e=b._cls.button}b._cls.button=c;f=b.createButton(d,a.extend({},h));if(e!=="undefined"){b._cls.button=e}return f}return null},getInfo:function(){return{longname:"MovableType",author:"Six Apart, Ltd",authorurl:"",infourl:"",version:"1.0"}}});tinymce.PluginManager.add("mt",tinymce.plugins.MovableType)})(jQuery);
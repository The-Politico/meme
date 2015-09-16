MEME.MemeEditorView=Backbone.View.extend({initialize:function(){this.buildForms(),this.listenTo(this.model,"change",this.render),this.render()},buildForms:function(){function t(t){return _.reduce(t,function(t,e){return t+=['<option value="',e.hasOwnProperty("value")?e.value:e,'">',e.hasOwnProperty("text")?e.text:e,"</option>"].join("")},"")}var e=this.model.toJSON();if(e.textShadowEdit&&$("#text-shadow").parent().show(),e.textAlignOpts&&e.textAlignOpts.length&&$("#text-align").append(t(e.textAlignOpts)).show(),e.aspectRatioOpts&&e.aspectRatioOpts.length&&$("#aspect-ratio").append(t(e.aspectRatioOpts)).show(),e.fontSizeOpts&&e.fontSizeOpts.length&&$("#font-size").append(t(e.fontSizeOpts)).show(),e.fontFamilyOpts&&e.fontFamilyOpts.length&&$("#font-family").append(t(e.fontFamilyOpts)).show(),e.watermarkOpts&&e.watermarkOpts.length&&$("#watermark").append(t(e.watermarkOpts)).show(),e.overlayColorOpts&&e.overlayColorOpts.length){var a=_.reduce(e.overlayColorOpts,function(t,e){var a=e.hasOwnProperty("value")?e.value:e;return t+='<li><label><input class="m-editor__swatch" style="background-color:'+a+'" type="radio" name="overlay" value="'+a+'"></label></li>'},"");$("#overlay").show().find("ul").append(a)}},render:function(){var t=this.model.toJSON();this.$("#headline").val(t.headlineText),this.$("#credit").val(t.creditText),this.$("#watermark").val(t.watermarkSrc),this.$("#image-scale").val(t.imageScale),this.$("#font-size").val(t.fontSize),this.$("#font-family").val(t.fontFamily),this.$("#text-align").val(t.textAlign),this.$("#aspect-ratio").val(t.width+"x"+t.height),this.$("#text-shadow").prop("checked",t.textShadow),this.$("#overlay").find('[value="'+t.overlayColor+'"]').prop("checked",!0)},events:{"input #headline":"onHeadline","input #credit":"onCredit","input #image-scale":"onScale","change #font-size":"onFontSize","change #font-family":"onFontFamily","change #watermark":"onWatermark","change #text-align":"onTextAlign","change #aspect-ratio":"onAspectRatio","change #text-shadow":"onTextShadow",'change [name="overlay"]':"onOverlayColor","dragover #dropzone":"onZoneOver","dragleave #dropzone":"onZoneOut","drop #dropzone":"onZoneDrop"},onCredit:function(){this.model.set("creditText",this.$("#credit").val())},onHeadline:function(){this.model.set("headlineText",this.$("#headline").val())},onTextAlign:function(){this.model.set("textAlign",this.$("#text-align").val())},onAspectRatio:function(){this.model.set({width:parseInt(this.$("#aspect-ratio").val().split("x")[0]),height:parseInt(this.$("#aspect-ratio").val().split("x")[1])})},onTextShadow:function(){this.model.set("textShadow",this.$("#text-shadow").prop("checked"))},onFontSize:function(){this.model.set("fontSize",this.$("#font-size").val())},onFontFamily:function(){this.model.set("fontFamily",this.$("#font-family").val())},onWatermark:function(){this.model.set("watermarkSrc",this.$("#watermark").val()),localStorage&&localStorage.setItem("meme_watermark",this.$("#watermark").val())},onScale:function(){this.model.set("imageScale",this.$("#image-scale").val())},onOverlayColor:function(t){this.model.set("overlayColor",this.$(t.target).val())},getDataTransfer:function(t){return t.stopPropagation(),t.preventDefault(),t.originalEvent.dataTransfer||null},onZoneOver:function(t){var e=this.getDataTransfer(t);e&&(e.dropEffect="copy",this.$("#dropzone").addClass("pulse"))},onZoneOut:function(){this.$("#dropzone").removeClass("pulse")},onZoneDrop:function(t){var e=this.getDataTransfer(t);e&&(this.model.loadBackground(e.files[0]),this.$("#dropzone").removeClass("pulse"))}});
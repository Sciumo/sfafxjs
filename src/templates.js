(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["sfaf.txt"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.contextOrFrameLookup(context, frame, "records") == runtime.contextOrFrameLookup(context, frame, "undefined")) {
output += "\n!ERROR NO RECORDS\n";
;
}
else {
output += "\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "records");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("rec", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n  ";
frame = frame.push();
var t_7 = runtime.memberLookup((t_4),"sfaf");
if(t_7) {var t_5;
if(runtime.isArray(t_7)) {
var t_6 = t_7.length;
for(t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5][0]
frame.set("item", t_7[t_5][0]);
var t_9 = t_7[t_5][1]
frame.set("entryO", t_7[t_5][1]);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n    ";
if(env.getFilter("length").call(context, runtime.memberLookup((t_9),"entry"))) {
output += "\n      ";
frame = frame.push();
var t_12 = runtime.memberLookup((t_9),"entry");
if(t_12) {var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("txt", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\nO ";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "entry0")),"entry")),"length"), env.opts.autoescape);
output += "\n      ";
;
}
}
frame = frame.pop();
output += "\n    ";
;
}
else {
output += "\nI";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"entry"), env.opts.autoescape);
output += "\n    ";
;
}
output += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "entry")),"occur")),"length") > 0) {
output += "\n      ";
frame = frame.push();
var t_16 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "entry")),"occur");
if(t_16) {var t_14;
if(runtime.isArray(t_16)) {
var t_15 = t_16.length;
for(t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14][0]
frame.set("oc", t_16[t_14][0]);
var t_18 = t_16[t_14][1]
frame.set("ocent", t_16[t_14][1]);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
output += "\n        ";
frame = frame.push();
var t_21 = t_18;
if(t_21) {var t_20 = t_21.length;
for(var t_19=0; t_19 < t_21.length; t_19++) {
var t_22 = t_21[t_19];
frame.set("txt", t_22);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
output += "\n";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "/";
output += runtime.suppressValue(t_17, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(t_22, env.opts.autoescape);
output += "\n        ";
;
}
}
frame = frame.pop();
output += "\n      ";
;
}
} else {
t_14 = -1;
var t_15 = runtime.keys(t_16).length;
for(var t_23 in t_16) {
t_14++;
var t_24 = t_16[t_23];
frame.set("oc", t_23);
frame.set("ocent", t_24);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
output += "\n        ";
frame = frame.push();
var t_27 = t_24;
if(t_27) {var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("txt", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
output += "\n";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "/";
output += runtime.suppressValue(t_23, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(t_28, env.opts.autoescape);
output += "\n        ";
;
}
}
frame = frame.pop();
output += "\n      ";
;
}
}
}
frame = frame.pop();
output += "\n    ";
;
}
output += "\n  ";
;
}
} else {
t_5 = -1;
var t_6 = runtime.keys(t_7).length;
for(var t_29 in t_7) {
t_5++;
var t_30 = t_7[t_29];
frame.set("item", t_29);
frame.set("entryO", t_30);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n    ";
if(env.getFilter("length").call(context, runtime.memberLookup((t_30),"entry"))) {
output += "\n      ";
frame = frame.push();
var t_33 = runtime.memberLookup((t_30),"entry");
if(t_33) {var t_32 = t_33.length;
for(var t_31=0; t_31 < t_33.length; t_31++) {
var t_34 = t_33[t_31];
frame.set("txt", t_34);
frame.set("loop.index", t_31 + 1);
frame.set("loop.index0", t_31);
frame.set("loop.revindex", t_32 - t_31);
frame.set("loop.revindex0", t_32 - t_31 - 1);
frame.set("loop.first", t_31 === 0);
frame.set("loop.last", t_31 === t_32 - 1);
frame.set("loop.length", t_32);
output += "\nO ";
output += runtime.suppressValue(t_29, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(t_34, env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "entry0")),"entry")),"length"), env.opts.autoescape);
output += "\n      ";
;
}
}
frame = frame.pop();
output += "\n    ";
;
}
else {
output += "\nI";
output += runtime.suppressValue(t_29, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(runtime.memberLookup((t_30),"entry"), env.opts.autoescape);
output += "\n    ";
;
}
output += "\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "entry")),"occur")),"length") > 0) {
output += "\n      ";
frame = frame.push();
var t_37 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "entry")),"occur");
if(t_37) {var t_35;
if(runtime.isArray(t_37)) {
var t_36 = t_37.length;
for(t_35=0; t_35 < t_37.length; t_35++) {
var t_38 = t_37[t_35][0]
frame.set("oc", t_37[t_35][0]);
var t_39 = t_37[t_35][1]
frame.set("ocent", t_37[t_35][1]);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
output += "\n        ";
frame = frame.push();
var t_42 = t_39;
if(t_42) {var t_41 = t_42.length;
for(var t_40=0; t_40 < t_42.length; t_40++) {
var t_43 = t_42[t_40];
frame.set("txt", t_43);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
output += "\n";
output += runtime.suppressValue(t_29, env.opts.autoescape);
output += "/";
output += runtime.suppressValue(t_38, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(t_43, env.opts.autoescape);
output += "\n        ";
;
}
}
frame = frame.pop();
output += "\n      ";
;
}
} else {
t_35 = -1;
var t_36 = runtime.keys(t_37).length;
for(var t_44 in t_37) {
t_35++;
var t_45 = t_37[t_44];
frame.set("oc", t_44);
frame.set("ocent", t_45);
frame.set("loop.index", t_35 + 1);
frame.set("loop.index0", t_35);
frame.set("loop.revindex", t_36 - t_35);
frame.set("loop.revindex0", t_36 - t_35 - 1);
frame.set("loop.first", t_35 === 0);
frame.set("loop.last", t_35 === t_36 - 1);
frame.set("loop.length", t_36);
output += "\n        ";
frame = frame.push();
var t_48 = t_45;
if(t_48) {var t_47 = t_48.length;
for(var t_46=0; t_46 < t_48.length; t_46++) {
var t_49 = t_48[t_46];
frame.set("txt", t_49);
frame.set("loop.index", t_46 + 1);
frame.set("loop.index0", t_46);
frame.set("loop.revindex", t_47 - t_46);
frame.set("loop.revindex0", t_47 - t_46 - 1);
frame.set("loop.first", t_46 === 0);
frame.set("loop.last", t_46 === t_47 - 1);
frame.set("loop.length", t_47);
output += "\n";
output += runtime.suppressValue(t_29, env.opts.autoescape);
output += "/";
output += runtime.suppressValue(t_44, env.opts.autoescape);
output += ".     ";
output += runtime.suppressValue(t_49, env.opts.autoescape);
output += "\n        ";
;
}
}
frame = frame.pop();
output += "\n      ";
;
}
}
}
frame = frame.pop();
output += "\n    ";
;
}
output += "\n  ";
;
}
}
}
frame = frame.pop();
output += "\n";
;
}
}
frame = frame.pop();
output += "\n";
;
}
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

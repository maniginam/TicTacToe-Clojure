// Compiled by ClojureScript 1.10.773 {}
goog.provide('sablono.util');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('clojure.set');
goog.require('clojure.string');
sablono.util._STAR_base_url_STAR_ = null;

/**
 * @interface
 */
sablono.util.ToString = function(){};

var sablono$util$ToString$to_str$dyn_10028 = (function (x){
var x__4428__auto__ = (((x == null))?null:x);
var m__4429__auto__ = (sablono.util.to_str[goog.typeOf(x__4428__auto__)]);
if((!((m__4429__auto__ == null)))){
return m__4429__auto__.call(null,x);
} else {
var m__4426__auto__ = (sablono.util.to_str["_"]);
if((!((m__4426__auto__ == null)))){
return m__4426__auto__.call(null,x);
} else {
throw cljs.core.missing_protocol.call(null,"ToString.to-str",x);
}
}
});
/**
 * Convert a value into a string.
 */
sablono.util.to_str = (function sablono$util$to_str(x){
if((((!((x == null)))) && ((!((x.sablono$util$ToString$to_str$arity$1 == null)))))){
return x.sablono$util$ToString$to_str$arity$1(x);
} else {
return sablono$util$ToString$to_str$dyn_10028.call(null,x);
}
});


/**
 * @interface
 */
sablono.util.ToURI = function(){};

var sablono$util$ToURI$to_uri$dyn_10029 = (function (x){
var x__4428__auto__ = (((x == null))?null:x);
var m__4429__auto__ = (sablono.util.to_uri[goog.typeOf(x__4428__auto__)]);
if((!((m__4429__auto__ == null)))){
return m__4429__auto__.call(null,x);
} else {
var m__4426__auto__ = (sablono.util.to_uri["_"]);
if((!((m__4426__auto__ == null)))){
return m__4426__auto__.call(null,x);
} else {
throw cljs.core.missing_protocol.call(null,"ToURI.to-uri",x);
}
}
});
/**
 * Convert a value into a URI.
 */
sablono.util.to_uri = (function sablono$util$to_uri(x){
if((((!((x == null)))) && ((!((x.sablono$util$ToURI$to_uri$arity$1 == null)))))){
return x.sablono$util$ToURI$to_uri$arity$1(x);
} else {
return sablono$util$ToURI$to_uri$dyn_10029.call(null,x);
}
});

/**
 * Converts its arguments into a string using to-str.
 */
sablono.util.as_str = (function sablono$util$as_str(var_args){
var args__4742__auto__ = [];
var len__4736__auto___10031 = arguments.length;
var i__4737__auto___10032 = (0);
while(true){
if((i__4737__auto___10032 < len__4736__auto___10031)){
args__4742__auto__.push((arguments[i__4737__auto___10032]));

var G__10033 = (i__4737__auto___10032 + (1));
i__4737__auto___10032 = G__10033;
continue;
} else {
}
break;
}

var argseq__4743__auto__ = ((((0) < args__4742__auto__.length))?(new cljs.core.IndexedSeq(args__4742__auto__.slice((0)),(0),null)):null);
return sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(argseq__4743__auto__);
});

(sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
return clojure.string.join.call(null,cljs.core.map.call(null,sablono.util.to_str,xs));
}));

(sablono.util.as_str.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(sablono.util.as_str.cljs$lang$applyTo = (function (seq10030){
var self__4724__auto__ = this;
return self__4724__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq10030));
}));

/**
 * Returns camel case version of the key, e.g. :http-equiv becomes :httpEquiv.
 */
sablono.util.camel_case = (function sablono$util$camel_case(k){
if((((k instanceof cljs.core.Keyword)) || (typeof k === 'string') || ((k instanceof cljs.core.Symbol)))){
var vec__10034 = cljs.core.name.call(null,k).split("-");
var seq__10035 = cljs.core.seq.call(null,vec__10034);
var first__10036 = cljs.core.first.call(null,seq__10035);
var seq__10035__$1 = cljs.core.next.call(null,seq__10035);
var first_word = first__10036;
var words = seq__10035__$1;
if(((cljs.core.empty_QMARK_.call(null,words)) || (cljs.core._EQ_.call(null,"aria",first_word)) || (cljs.core._EQ_.call(null,"data",first_word)))){
return k;
} else {
return cljs.core.keyword.call(null,clojure.string.join.call(null,cljs.core.conj.call(null,cljs.core.map.call(null,clojure.string.capitalize,words),first_word)));
}
} else {
return k;
}
});
/**
 * Recursively transforms all map keys into camel case.
 */
sablono.util.camel_case_keys = (function sablono$util$camel_case_keys(m){
if(cljs.core.map_QMARK_.call(null,m)){
var m__$1 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__10037){
var vec__10038 = p__10037;
var k = cljs.core.nth.call(null,vec__10038,(0),null);
var v = cljs.core.nth.call(null,vec__10038,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.util.camel_case.call(null,k),v], null);
})),m);
var G__10041 = m__$1;
if(cljs.core.map_QMARK_.call(null,new cljs.core.Keyword(null,"style","style",-496642736).cljs$core$IFn$_invoke$arity$1(m__$1))){
return cljs.core.update.call(null,G__10041,new cljs.core.Keyword(null,"style","style",-496642736),sablono.util.camel_case_keys);
} else {
return G__10041;
}
} else {
return m;
}
});
/**
 * Return true if `x` is an HTML element. True when `x` is a vector
 *   and the first element is a keyword, e.g. `[:div]` or `[:div [:span "x"]`.
 */
sablono.util.element_QMARK_ = (function sablono$util$element_QMARK_(x){
return ((cljs.core.vector_QMARK_.call(null,x)) && ((cljs.core.first.call(null,x) instanceof cljs.core.Keyword)));
});
/**
 * Converts all HTML attributes to their DOM equivalents.
 */
sablono.util.html_to_dom_attrs = (function sablono$util$html_to_dom_attrs(attrs){
return clojure.set.rename_keys.call(null,sablono.util.camel_case_keys.call(null,attrs),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"className","className",-1983287057),new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720)], null));
});
/**
 * Join the `classes` with a whitespace.
 */
sablono.util.join_classes = (function sablono$util$join_classes(classes){
return clojure.string.join.call(null," ",cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.comp.call(null,cljs.core.mapcat.call(null,(function (x){
if(typeof x === 'string'){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
} else {
return cljs.core.seq.call(null,x);
}
})),cljs.core.remove.call(null,cljs.core.nil_QMARK_)),classes));
});
(cljs.core.Keyword.prototype.sablono$util$ToString$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.sablono$util$ToString$to_str$arity$1 = (function (x){
var x__$1 = this;
return cljs.core.name.call(null,x__$1);
}));

(goog.Uri.prototype.sablono$util$ToString$ = cljs.core.PROTOCOL_SENTINEL);

(goog.Uri.prototype.sablono$util$ToString$to_str$arity$1 = (function (x){
var x__$1 = this;
if(cljs.core.truth_((function (){var or__4126__auto__ = x__$1.hasDomain();
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return (((x__$1.getPath() == null)) || (cljs.core.not.call(null,cljs.core.re_matches.call(null,/^\/.*/,x__$1.getPath()))));
}
})())){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x__$1);
} else {
var base = cljs.core.str.cljs$core$IFn$_invoke$arity$1(sablono.util._STAR_base_url_STAR_);
if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*\/$/,base))){
return [cljs.core.subs.call(null,base,(0),(((base).length) - (1))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(x__$1)].join('');
} else {
return [base,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x__$1)].join('');
}
}
}));

goog.object.set(sablono.util.ToString,"null",true);

goog.object.set(sablono.util.to_str,"null",(function (_){
return "";
}));

goog.object.set(sablono.util.ToString,"number",true);

goog.object.set(sablono.util.to_str,"number",(function (x){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x);
}));

goog.object.set(sablono.util.ToString,"_",true);

goog.object.set(sablono.util.to_str,"_",(function (x){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x);
}));
(goog.Uri.prototype.sablono$util$ToURI$ = cljs.core.PROTOCOL_SENTINEL);

(goog.Uri.prototype.sablono$util$ToURI$to_uri$arity$1 = (function (x){
var x__$1 = this;
return x__$1;
}));

goog.object.set(sablono.util.ToURI,"_",true);

goog.object.set(sablono.util.to_uri,"_",(function (x){
return (new goog.Uri(cljs.core.str.cljs$core$IFn$_invoke$arity$1(x)));
}));

//# sourceMappingURL=util.js.map

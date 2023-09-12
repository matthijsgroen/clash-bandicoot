/*! For license information please see ui-components-atoms-Badge-stories.49e3e894.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkcoc_simulator=self.webpackChunkcoc_simulator||[]).push([[831,746],{"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}});var esm_typeof=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectWithoutProperties}})},"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./node_modules/classnames/index.js":function(module,exports){var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./src/ui-components/atoms/Badge.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Badge:function(){return Badge_stories_Badge},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Badge_stories}});var objectSpread2=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),Badge_module_badgeContainer="Badge_badgeContainer__kOP2c",Badge_module_badge="Badge_badge__S901r",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Badge=function Badge(_ref){var children=_ref.children,_ref$hidden=_ref.hidden,hidden=void 0!==_ref$hidden&&_ref$hidden,content=_ref.content,_ref$color=_ref.color,color=void 0===_ref$color?"red":_ref$color;return(0,jsx_runtime.jsxs)("span",{className:Badge_module_badgeContainer,children:[children,!hidden&&(0,jsx_runtime.jsx)("span",{className:Badge_module_badge,style:{"--badge-color":color},children:content})]})};try{Badge.displayName="Badge",Badge.__docgenInfo={description:"",displayName:"Badge",props:{color:{defaultValue:{value:"red"},description:"",name:"color",required:!1,type:{name:"Color"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},hidden:{defaultValue:{value:"false"},description:"",name:"hidden",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ui-components/atoms/Badge.tsx#Badge"]={docgenInfo:Badge.__docgenInfo,name:"Badge",path:"src/ui-components/atoms/Badge.tsx#Badge"})}catch(__react_docgen_typescript_loader_error){}var _Badge$parameters,_Badge$parameters2,_Badge$parameters2$do,Button_stories=__webpack_require__("./src/ui-components/atoms/Button.stories.ts"),Button=__webpack_require__("./src/ui-components/atoms/Button.tsx"),Badge_stories={title:"Atoms/Badge",component:Badge,parameters:{layout:"fullscreen"}},Badge_stories_Badge={args:{color:"orange",content:"2",children:[(0,jsx_runtime.jsx)(Button.z,(0,objectSpread2.Z)((0,objectSpread2.Z)({},Button_stories.Button.args),{},{color:"limegreen"}))]},decorators:[function(Story){return(0,jsx_runtime.jsx)("div",{style:{padding:"1rem"},children:(0,jsx_runtime.jsx)(Story,{})})}]};Badge_stories_Badge.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},Badge_stories_Badge.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_Badge$parameters=Badge_stories_Badge.parameters)||void 0===_Badge$parameters?void 0:_Badge$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:'{\n  args: {\n    color: "orange",\n    content: "2",\n    children: [<Button {...ButtonArgs.args} color="limegreen" />]\n  },\n  decorators: [Story => <div style={{\n    padding: "1rem"\n  }}>\n        <Story />\n      </div>]\n}'},null===(_Badge$parameters2=Badge_stories_Badge.parameters)||void 0===_Badge$parameters2||null===(_Badge$parameters2$do=_Badge$parameters2.docs)||void 0===_Badge$parameters2$do?void 0:_Badge$parameters2$do.source)})});var __namedExportsOrder=["Badge"]},"./src/ui-components/atoms/Button.stories.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Button:function(){return Button},IconButton:function(){return IconButton},PressedButton:function(){return PressedButton},SmallButton:function(){return SmallButton},TinyButton:function(){return TinyButton},__namedExportsOrder:function(){return __namedExportsOrder}});var _Button$parameters,_Button$parameters2,_Button$parameters2$d,_SmallButton$paramete,_SmallButton$paramete2,_SmallButton$paramete3,_TinyButton$parameter,_TinyButton$parameter2,_TinyButton$parameter3,_IconButton$parameter,_IconButton$parameter2,_IconButton$parameter3,_PressedButton$parame,_PressedButton$parame2,_PressedButton$parame3,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),meta={title:"Atoms/Button",component:__webpack_require__("./src/ui-components/atoms/Button.tsx").z,parameters:{layout:"fullscreen"}};__webpack_exports__.default=meta;var Button={args:{color:"orange",disabled:!1,children:"Hello",width:"default",height:"default"}},SmallButton={args:{color:"red",disabled:!1,children:"Delete",width:"default",height:"small"}},TinyButton={args:{color:"red",disabled:!1,children:"-",width:"tiny",height:"tiny"}},IconButton={args:{color:"lightgrey",disabled:!1,children:"🗡️",width:"small",height:"small"}},PressedButton={args:{color:"orange",disabled:!1,children:"Hello",width:"huge",height:"small",pressed:!0}};Button.parameters=(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},Button.parameters),{},{docs:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_Button$parameters=Button.parameters)||void 0===_Button$parameters?void 0:_Button$parameters.docs),{},{source:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:'{\n  args: {\n    color: "orange",\n    disabled: false,\n    children: "Hello",\n    width: "default",\n    height: "default"\n  }\n}'},null===(_Button$parameters2=Button.parameters)||void 0===_Button$parameters2||null===(_Button$parameters2$d=_Button$parameters2.docs)||void 0===_Button$parameters2$d?void 0:_Button$parameters2$d.source)})}),SmallButton.parameters=(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},SmallButton.parameters),{},{docs:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_SmallButton$paramete=SmallButton.parameters)||void 0===_SmallButton$paramete?void 0:_SmallButton$paramete.docs),{},{source:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:'{\n  args: {\n    color: "red",\n    disabled: false,\n    children: "Delete",\n    width: "default",\n    height: "small"\n  }\n}'},null===(_SmallButton$paramete2=SmallButton.parameters)||void 0===_SmallButton$paramete2||null===(_SmallButton$paramete3=_SmallButton$paramete2.docs)||void 0===_SmallButton$paramete3?void 0:_SmallButton$paramete3.source)})}),TinyButton.parameters=(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},TinyButton.parameters),{},{docs:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_TinyButton$parameter=TinyButton.parameters)||void 0===_TinyButton$parameter?void 0:_TinyButton$parameter.docs),{},{source:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:'{\n  args: {\n    color: "red",\n    disabled: false,\n    children: "-",\n    width: "tiny",\n    height: "tiny"\n  }\n}'},null===(_TinyButton$parameter2=TinyButton.parameters)||void 0===_TinyButton$parameter2||null===(_TinyButton$parameter3=_TinyButton$parameter2.docs)||void 0===_TinyButton$parameter3?void 0:_TinyButton$parameter3.source)})}),IconButton.parameters=(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},IconButton.parameters),{},{docs:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_IconButton$parameter=IconButton.parameters)||void 0===_IconButton$parameter?void 0:_IconButton$parameter.docs),{},{source:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:'{\n  args: {\n    color: "lightgrey",\n    disabled: false,\n    children: "🗡️",\n    width: "small",\n    height: "small"\n  }\n}'},null===(_IconButton$parameter2=IconButton.parameters)||void 0===_IconButton$parameter2||null===(_IconButton$parameter3=_IconButton$parameter2.docs)||void 0===_IconButton$parameter3?void 0:_IconButton$parameter3.source)})}),PressedButton.parameters=(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},PressedButton.parameters),{},{docs:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},null===(_PressedButton$parame=PressedButton.parameters)||void 0===_PressedButton$parame?void 0:_PressedButton$parame.docs),{},{source:(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({originalSource:'{\n  args: {\n    color: "orange",\n    disabled: false,\n    children: "Hello",\n    width: "huge",\n    height: "small",\n    pressed: true\n  }\n}'},null===(_PressedButton$parame2=PressedButton.parameters)||void 0===_PressedButton$parame2||null===(_PressedButton$parame3=_PressedButton$parame2.docs)||void 0===_PressedButton$parame3?void 0:_PressedButton$parame3.source)})});var __namedExportsOrder=["Button","SmallButton","TinyButton","IconButton","PressedButton"]},"./src/ui-components/atoms/Button.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{z:function(){return Button}});var objectSpread2=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectWithoutProperties=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),Button_module_button="Button_button__d3Ync",Button_module_outer="Button_outer__Zd-2h",Button_module_inner="Button_inner__FQgg0",Button_module_tinyWidth="Button_tinyWidth__Ml8ih",Button_module_tinyHeight="Button_tinyHeight__MdMxE",Button_module_miniWidth="Button_miniWidth__kkMPb",Button_module_miniHeight="Button_miniHeight__Xy1IS",Button_module_smallWidth="Button_smallWidth__6Au+0",Button_module_smallHeight="Button_smallHeight__2-ayX",Button_module_icon="Button_icon__8toTl",Button_module_defaultWidth="Button_defaultWidth__YbRjm",Button_module_defaultHeight="Button_defaultHeight__z37An",Button_module_largeWidth="Button_largeWidth__85zGu",Button_module_largeHeight="Button_largeHeight__C1xRJ",Button_module_hugeWidth="Button_hugeWidth__Uzr0G",Button_module_hugeHeight="Button_hugeHeight__RXekj",Button_module_pressed="Button_pressed__8kIHu",Button_module_invisible="Button_invisible__FmPTx",classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),useLongPress=__webpack_require__("./src/ui-components/hooks/useLongPress.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["color","height","width","pressed","invisible","icon","className","longPress"],Button=react.forwardRef((function(_ref,ref){var _classNames,_augmentedEvents$chil,color=_ref.color,height=_ref.height,width=_ref.width,pressed=_ref.pressed,invisible=_ref.invisible,icon=_ref.icon,className=_ref.className,_ref$longPress=_ref.longPress,longPress=void 0!==_ref$longPress&&_ref$longPress,props=(0,objectWithoutProperties.Z)(_ref,_excluded),augmentedEvents=(0,useLongPress.T)(props,longPress);return(0,jsx_runtime.jsx)("button",(0,objectSpread2.Z)((0,objectSpread2.Z)({type:"button",ref:ref},augmentedEvents),{},{style:{"--color":color},className:classnames_default()(Button_module_button,(_classNames={},(0,defineProperty.Z)(_classNames,Button_module_tinyHeight,"tiny"===height),(0,defineProperty.Z)(_classNames,Button_module_miniHeight,"mini"===height),(0,defineProperty.Z)(_classNames,Button_module_smallHeight,"small"===height),(0,defineProperty.Z)(_classNames,Button_module_defaultHeight,"default"===height),(0,defineProperty.Z)(_classNames,Button_module_largeHeight,"large"===height),(0,defineProperty.Z)(_classNames,Button_module_hugeHeight,"huge"===height),(0,defineProperty.Z)(_classNames,Button_module_icon,icon),(0,defineProperty.Z)(_classNames,Button_module_invisible,invisible),(0,defineProperty.Z)(_classNames,Button_module_tinyWidth,"tiny"===width),(0,defineProperty.Z)(_classNames,Button_module_miniWidth,"mini"===width),(0,defineProperty.Z)(_classNames,Button_module_smallWidth,"small"===width),(0,defineProperty.Z)(_classNames,Button_module_defaultWidth,"default"===width),(0,defineProperty.Z)(_classNames,Button_module_largeWidth,"large"===width),(0,defineProperty.Z)(_classNames,Button_module_hugeWidth,"huge"===width),(0,defineProperty.Z)(_classNames,Button_module_pressed,pressed),(0,defineProperty.Z)(_classNames,null!=className?className:"",className),_classNames)),children:(0,jsx_runtime.jsx)("div",{className:Button_module_outer,children:(0,jsx_runtime.jsx)("div",{className:Button_module_inner,"aria-label":null===(_augmentedEvents$chil=augmentedEvents.children)||void 0===_augmentedEvents$chil?void 0:_augmentedEvents$chil.toString(),children:augmentedEvents.children})})}))}));try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"default"'},{value:'"large"'},{value:'"tiny"'},{value:'"mini"'},{value:'"huge"'}]}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"default"'},{value:'"large"'},{value:'"tiny"'},{value:'"mini"'},{value:'"huge"'}]}},invisible:{defaultValue:null,description:"",name:"invisible",required:!1,type:{name:"boolean"}},pressed:{defaultValue:null,description:"",name:"pressed",required:!1,type:{name:"boolean"}},longPress:{defaultValue:{value:"false"},description:"",name:"longPress",required:!1,type:{name:"boolean"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ui-components/atoms/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/ui-components/atoms/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/ui-components/hooks/useLongPress.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{T:function(){return useLongPress}});var _home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),useLongPress=function useLongPress(events,enabled){var timerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({}),onClick=events.onClick;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return function(){clearInterval(timerRef.current.timer)}}),[]);var onPointerDown=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){e.preventDefault(),clearInterval(timerRef.current.timer),timerRef.current.timer=setInterval((function(){null==onClick||onClick(e)}),150)}),[onClick]),onPointerUp=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){e.preventDefault(),clearInterval(timerRef.current.timer)}),[]),onContextMenu=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){e.preventDefault()}),[]);return enabled&&events.onClick?(0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)((0,_home_runner_work_clash_bandicoot_clash_bandicoot_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},events),{},{onPointerDown:onPointerDown,onPointerUp:onPointerUp,onPointerCancel:onPointerUp,onContextMenu:onContextMenu}):(clearInterval(timerRef.current.timer),events)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
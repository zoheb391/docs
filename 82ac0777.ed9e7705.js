(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return r})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var a=n(3),i=n(7),s=(n(0),n(179)),o={title:"Extending types"},r={unversionedId:"api/start/types.extend",id:"api/start/types.extend",isDocsHomePage:!1,title:"Extending types",description:"Circling back to metadata, by default the metadata information (at this point in time), only returns the type names as they apply to any section, be it a call, event or query. As an example, this means that transfers are defined as balances.transfer(AccountId, Balance) with no details as to the mapping of the Balance type to a u128. (The underlying Polkadot/Substrate default)",source:"@site/docs/api/start/types.extend.md",slug:"/api/start/types.extend",permalink:"/docs/api/start/types.extend",editUrl:"https://github.com/polkadot-js/docs/edit/master/docs/api/start/types.extend.md",version:"current",sidebar:"reference",previous:{title:"Type basics",permalink:"/docs/api/start/types.basics"},next:{title:"rpc.custom",permalink:"/docs/api/start/rpc.custom"}},c=[{value:"Extension",id:"extension",children:[]},{value:"Field ordering",id:"field-ordering",children:[]},{value:"User-defined structs",id:"user-defined-structs",children:[]},{value:"Definition clashes",id:"definition-clashes",children:[]},{value:"Type clashes",id:"type-clashes",children:[]},{value:"User-defined enum",id:"user-defined-enum",children:[]},{value:"Node and chain-specific types",id:"node-and-chain-specific-types",children:[]},{value:"Impact on extrinsics",id:"impact-on-extrinsics",children:[]},{value:"Custom RPC",id:"custom-rpc",children:[]}],p={toc:c};function l(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(s.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Circling back to metadata, by default the metadata information (at this point in time), only returns the type names as they apply to any section, be it a call, event or query. As an example, this means that transfers are defined as ",Object(s.b)("inlineCode",{parentName:"p"},"balances.transfer(AccountId, Balance)")," with no details as to the mapping of the ",Object(s.b)("inlineCode",{parentName:"p"},"Balance")," type to a ",Object(s.b)("inlineCode",{parentName:"p"},"u128"),". (The underlying Polkadot/Substrate default)"),Object(s.b)("p",null,"Therefore to cater for all types, a mapping is done in the ",Object(s.b)("a",{parentName:"p",href:"https://github.com/polkadot-js/api/tree/master/packages/types/src/interfaces"},"@polkadot/types library")," to define each of the types and align with their underlying structures as it maps to a default Polkadot or Substrate chain."),Object(s.b)("p",null,"Additionally, the API contains some logic for chain type detection, for instance in the case of Substrate 1.x based chains, it will define ",Object(s.b)("inlineCode",{parentName:"p"},"BlockNumber")," & ",Object(s.b)("inlineCode",{parentName:"p"},"Index")," (nonce) as a ",Object(s.b)("inlineCode",{parentName:"p"},"u64"),", while for current-generation chains, these will be defined as ",Object(s.b)("inlineCode",{parentName:"p"},"u32"),". Some of the work in maintaining the API for Polkadot/Substrate is the addition of types as they appear and gets used in the Rust codebase."),Object(s.b)("h2",{id:"extension"},"Extension"),Object(s.b)("p",null,"As a blockchain toolkit, Substrate makes it easy to add your own modules and types. In most non-trivial implementations, this would mean that developers are adding specific types for their implementation as well. The API will get to know the names of these types via the metadata, however it won't understand what they are, which means it cannot encode or decode them. Additionally, when a type is mismatched between the node and the API, the decoding can fail, yielding issues such as ",Object(s.b)("a",{parentName:"p",href:"/docs/api/FAQ#the-node-returns-a-could-not-convert-error-on-send"},"Could not convert errors")," when submitting transactions."),Object(s.b)("p",null,"To close this gap, the API allows for the injection of types, i.e. you can explicitly define (or override) types for the node/chain you are connecting to. In the simplest example, assuming you have a chain where your ",Object(s.b)("inlineCode",{parentName:"p"},"Balance")," type is a ",Object(s.b)("inlineCode",{parentName:"p"},"u64")," (as opposed to the default ",Object(s.b)("inlineCode",{parentName:"p"},"u128"),"), you need to let the API know."),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"...\nconst api = await ApiPromise.create({\n  provider: wsProvider,\n  types: {\n    Balance: 'u64'\n  }\n});\n")),Object(s.b)("p",null,"The above introduces the ",Object(s.b)("inlineCode",{parentName:"p"},"types")," registry, effectively allowing overrides and the definition of new types. The override above would mean that immediately the API will treat all occurrences of ",Object(s.b)("inlineCode",{parentName:"p"},"Balance")," not as the default, but rather as the defined size."),Object(s.b)("h2",{id:"field-ordering"},"Field ordering"),Object(s.b)("p",null,"When defining any custom structures or types, it is critical that the following rules are applied -"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"Map exactly to what is defined in the Rust code, i.e. defining a ",Object(s.b)("inlineCode",{parentName:"li"},"SaleType")," cannot be ",Object(s.b)("inlineCode",{parentName:"li"},"u16")," on the one end and ",Object(s.b)("inlineCode",{parentName:"li"},"u32")," on the other end. If mismatches occur, the serialization will fail."),Object(s.b)("li",{parentName:"ul"},"Ensure that the field order is maintained in all definitions. The SCALE serialization is binary and contains no field names in the serialization, only the encoded values. Any decoding is therefore done based on the size of the type and the order thereof in the definitions.")),Object(s.b)("p",null,"These rules apply everywhere. Always ensure that the types match exactly between the environments and that the ordering is maintained, be it for structs, tuples or enums."),Object(s.b)("h2",{id:"user-defined-structs"},"User-defined structs"),Object(s.b)("p",null,"Registration also applies to any type that can be found on a specific chain, i.e. we can add any types that is available on a specific node -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"...\nconst api = await ApiPromise.create({\n  ...,\n  types: {\n    TransactionInput: {\n      parentOutput: 'Hash',\n      signature: 'Signature'\n    },\n    TransactionOutput: {\n      value: 'u128',\n      pubkey: 'Hash',\n      sale: 'u32'\n    },\n    Transaction: {\n      inputs: 'Vec<TransactionInput>',\n      outputs: 'Vec<TransactionOutput>'\n    }\n  }\n})\n")),Object(s.b)("p",null,"The example above defines non-primitive types (as found in the specific implementation) as structures. Additionally it also shows the user-defined types can depend on other user-defined types with ",Object(s.b)("inlineCode",{parentName:"p"},"Transaction")," referencing both ",Object(s.b)("inlineCode",{parentName:"p"},"TransactionInput")," and ",Object(s.b)("inlineCode",{parentName:"p"},"TransactionOutput"),". Here you can reference any known types, i.e. in the above we have referenced primitives such as ",Object(s.b)("inlineCode",{parentName:"p"},"u32")," and ",Object(s.b)("inlineCode",{parentName:"p"},"Signature")," (itself an alias for ",Object(s.b)("inlineCode",{parentName:"p"},"H512"),")."),Object(s.b)("h2",{id:"definition-clashes"},"Definition clashes"),Object(s.b)("p",null,"As explained in a previous section, the underlying API Codec types have a ",Object(s.b)("a",{parentName:"p",href:"/docs/api/start/types.basics"},"number of built-in properties")," and in some cases it could be that your struct has a field that conflicts. These should be minimal, however it can happen. Take the following example where a defined ",Object(s.b)("inlineCode",{parentName:"p"},"hash")," property clashes with the same-name Codec property -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"Document: {\n  name: 'Text',\n  uri: 'Text',\n  hash: 'Text'\n}\n")),Object(s.b)("p",null,"For this struct the ",Object(s.b)("inlineCode",{parentName:"p"},"hash")," will not be exposed, but rather be kept as the built-in ",Object(s.b)("inlineCode",{parentName:"p"},"hash"),'. At this point it is important to know that the values "over-the-wire" for calls, queries, events and consts is in binary form, i.e. it is an encoding of the values only. So on the JS side you can apply a rename with no ill-effects. Here we rename the ',Object(s.b)("inlineCode",{parentName:"p"},"hash")," to ",Object(s.b)("inlineCode",{parentName:"p"},"docHash"),", which mean the value will be available on ",Object(s.b)("inlineCode",{parentName:"p"},"<instance>.docHash"),"."),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"Document: {\n  name: 'Text',\n  uri: 'Text',\n  docHash: 'Text'\n}\n")),Object(s.b)("h2",{id:"type-clashes"},"Type clashes"),Object(s.b)("p",null,"Another kind of clash is a clash of types. For example a chain can have a ",Object(s.b)("inlineCode",{parentName:"p"},"Balance")," type defined in two pallets. In one, let's say the balances pallet, it is defined as ",Object(s.b)("inlineCode",{parentName:"p"},"u128")," and in the other, e.g. the assets pallet, it is defined as ",Object(s.b)("inlineCode",{parentName:"p"},"u64"),". "),Object(s.b)("p",null,"This will create an issue as polkadot JS will try to use the global balance defined (the ",Object(s.b)("inlineCode",{parentName:"p"},"u128")," in this case). In this scenario we would need a typeAlias. "),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},'{\n    typesAlias: {\n        "assets": {\n          "Balance": "u64"\n         }\n        },\n    types: {\n        "AssetDetails": {\n            "supply": "Balance"\n        }\n      }\n}\n')),Object(s.b)("p",null,"We define in our ",Object(s.b)("inlineCode",{parentName:"p"},"typesAlias")," that we want the type ",Object(s.b)("inlineCode",{parentName:"p"},"Balance")," to be a ",Object(s.b)("inlineCode",{parentName:"p"},"u64")," for the assets pallet, then we can define our types. "),Object(s.b)("h2",{id:"user-defined-enum"},"User-defined enum"),Object(s.b)("p",null,"One form of types that appear regularly is enums, these can be defined as follows -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"...\nconst api = await ApiPromise.create({\n  ...,\n  types: {\n    CLikeEnum: {\n      _enum: ['One', 'Two', 'Three']\n    },\n    TypedEnum: {\n      _enum: {\n        One: 'Compact<u32>',\n        Two: 'u64',\n        Three: 'Option<Balance>',\n        Four: null\n      }\n    }\n  }\n});\n")),Object(s.b)("p",null,"As seen in these examples, types are built up in terms of primitives and aligns with the Rust-type definition model with ",Object(s.b)("inlineCode",{parentName:"p"},"Compact"),", ",Object(s.b)("inlineCode",{parentName:"p"},"Option")," and ",Object(s.b)("inlineCode",{parentName:"p"},"Vec"),"."),Object(s.b)("h2",{id:"node-and-chain-specific-types"},"Node and chain-specific types"),Object(s.b)("p",null,"There are cases where a single API object can be used to connect to different types of nodes or chains, each including their own specific types. For these cases the ",Object(s.b)("inlineCode",{parentName:"p"},"typesChain")," and ",Object(s.b)("inlineCode",{parentName:"p"},"typesSpec")," injectors are made available."),Object(s.b)("p",null,"As a real-world example, the ",Object(s.b)("a",{parentName:"p",href:"https://github.com/polkadot-js/apps"},"polkadot-js/apps UI")," can connect to a variety of chains. To support ",Object(s.b)("a",{parentName:"p",href:"https://edgewa.re/"},"Edgeware")," by default, the following node-type (",Object(s.b)("inlineCode",{parentName:"p"},"specName")," as per the runtime version) overrides are made -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"import { IdentityTypes } from 'edgeware-node-types/dist/identity';\nimport { SignalingTypes } from 'edgeware-node-types/dist/signaling';\nimport { VotingTypes } from 'edgeware-node-types/dist/voting';\n\n...\nconst api = await ApiPromise.create({\n  ...,\n  typesSpec: {\n    edgeware: {\n      ...IdentityTypes,\n      ...SignalingTypes,\n      ...VotingTypes\n    }\n  }\n});\n")),Object(s.b)("p",null,"In the same way ",Object(s.b)("inlineCode",{parentName:"p"},"typesChain")," can be used to match on the actual chain name, i.e. for a chain such as Kusama, the following overrides can be made (as per example only - Kusama uses the Polkadot defaults, so no overrides are needed) -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"...\nconst api = await ApiPromise.create({\n  ...,\n  typesChain: {\n    Kusama: {\n      BlockNumber: 'u32',\n      Index: 'u32'\n    }\n  }\n});\n")),Object(s.b)("p",null,"The ",Object(s.b)("inlineCode",{parentName:"p"},"types"),", ",Object(s.b)("inlineCode",{parentName:"p"},"typesChain")," and ",Object(s.b)("inlineCode",{parentName:"p"},"typesSpec")," overrides are all optional and all are applied, as applicable to a specific connection. From the options ",Object(s.b)("inlineCode",{parentName:"p"},"types")," are registered first, followed by ",Object(s.b)("inlineCode",{parentName:"p"},"typesSpec")," for node-specific overrides and finally ",Object(s.b)("inlineCode",{parentName:"p"},"typesChain")," for chain-specific overrides. The would mean is you have the following (contrived) example,"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"...\nconst api = await ApiPromise.create({\n  ...,\n  types: {\n    Balance: 'u32',\n  }\n  typesChain: {\n    Balance: 'u128'\n  },\n  typesSpec: {\n    Balance: 'u64',\n  }\n});\n")),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"Balance")," would be defined as an ",Object(s.b)("inlineCode",{parentName:"p"},"u128")," at the end. Effectively based on the flow it is first registered as a ",Object(s.b)("inlineCode",{parentName:"p"},"u32"),", then overridden as a ",Object(s.b)("inlineCode",{parentName:"p"},"u64")," and finally overridden once more as a ",Object(s.b)("inlineCode",{parentName:"p"},"u128")," by the chain types."),Object(s.b)("h2",{id:"impact-on-extrinsics"},"Impact on extrinsics"),Object(s.b)("p",null,"When configuring your chain, be cognizant of the types you are using, and always ensure that any changes are replicated back to the API. In an earlier example we configured ",Object(s.b)("inlineCode",{parentName:"p"},"Balance")," as ",Object(s.b)("inlineCode",{parentName:"p"},"u64"),", in this case the same changes needs to be applied on the API, especially when there are mismatches compared to Substrate master. Not doing so means that failures will occur. The same would happen when your own types have mismatched fields or types are lacking fields on structs or enums."),Object(s.b)("p",null,"Mismatches also applies to any other chain-specific configured types and can have impacts on transactions. For instance you can customize ",Object(s.b)("inlineCode",{parentName:"p"},"Lookup")," and ",Object(s.b)("inlineCode",{parentName:"p"},"Address")," on your chain, changing the default lookup behavior. A real example of this is the Substrate master node vs the Substrate master node-template -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-rust"},"/// The lookup mechanism to get account ID from whatever is passed in dispatchers.\ntype Lookup = Indices;\n...\n/// The address format for describing accounts.\npub type Address = <Indices as StaticLookup>::Source;\n")),Object(s.b)("p",null,"And this is what is defined on the node-template -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-rust"},"/// The lookup mechanism to get account ID from whatever is passed in dispatchers.\ntype Lookup = IdentityLookup<AccountId>;\n...\n/// The address format for describing accounts.\npub type Address = AccountId;\n")),Object(s.b)("p",null,"Here the template was customized from the Substrate node defaults and the API needs to know how to map these types. Failure to make adjustments means transactions will fail. With this in mind the correct types that needs to be added here would be -"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js"},"const api = await ApiPromise.create({\n  ...,\n  types: {\n    // mapping the actual specified address format\n    Address: 'AccountId',\n    // mapping the lookup\n    LookupSource: 'AccountId'\n  }\n});\n")),Object(s.b)("p",null,"Always look at customization and understand the impacts, replicating these changes between the node and the API. For the above the ",Object(s.b)("inlineCode",{parentName:"p"},"Address")," type is used in the construction of the ",Object(s.b)("inlineCode",{parentName:"p"},"UncheckedExtrinsic")," type, while the lookup type is applicable on transactions such as ",Object(s.b)("inlineCode",{parentName:"p"},"balances.transfer(to: LookupSource, value: Balance)")),Object(s.b)("h2",{id:"custom-rpc"},"Custom RPC"),Object(s.b)("p",null,"In addition to customizing your node's modules and types, you can also add custom RPC definitions. Like the type definitions in this section, ",Object(s.b)("a",{parentName:"p",href:"/docs/api/start/rpc.custom"},"these can be defined and passed to the API")," for decoration."))}l.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return h}));var a=n(0),i=n.n(a);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=i.a.createContext({}),l=function(e){var t=i.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=l(e.components);return i.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(n),b=a,h=d["".concat(o,".").concat(b)]||d[b]||u[b]||s;return n?i.a.createElement(h,r(r({ref:t},p),{},{components:n})):i.a.createElement(h,r({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=b;var r={};for(var c in t)hasOwnProperty.call(t,c)&&(r[c]=t[c]);r.originalType=e,r.mdxType="string"==typeof e?e:a,o[1]=r;for(var p=2;p<s;p++)o[p]=n[p];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);
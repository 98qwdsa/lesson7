import React from "react";

const profile={
   
    email:"zhao.wu@accenture.com",
    get name(){
        return profile.email.substring(0,profile.email.indexOf("@"));
    }//ES6语法

}
// profile.name=profile.email.substring(0,profile.email.indexOf("@"));
export default profile;
export const NameContext=React.createContext({
    name:profile.name,
    changeName:()=>{}
})
export const EmailContext=React.createContext({
    email:profile.email,
    changeEmail:()=>{}
})
/*
Context提供了一种方式，能够让数据在组件树中传递，而不必一级一级手动传递
export 可以直接输出
const定义的变量不可以修改，而且必须初始化。
var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
.let是块级作用域，函数内部使用let定义后，对函数外部无影响
*/

/*
1、export default 向外暴露的成员，可以使用任意变量来接收
2、在一个模块中，export default 只允许向外暴露一次
3、在一个模块中，可以同时使用export default 和export 向外暴露成员
4、使用export向外暴露的成员，只能使用{ }的形式来接收，这种形式，叫做【按需导出】
5、export可以向外暴露多个成员，同时，如果某些成员，在import导入时，不需要，可以不在{ }中定义
6、使用export导出的成员，必须严格按照导出时候的名称，来使用{ }按需接收
7、使用export导出的成员，如果想换个变量名称接收，可以使用as来起别名
*/

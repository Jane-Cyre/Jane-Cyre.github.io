<template>
    <!-- 给每一个item项(todo)包裹transition标签添加过渡效果 -->
    <transition name="todo" appear>
        <li>
            <label>
                <input type="checkbox" :checked="todo.done" @change="handlecheck(todo.id)"/>&nbsp;
                <!-- 如下代码也能实现功能，但是不推荐，因为有点违反原则，因为其修改了props。只不过Vue未监测到 -->
                <!-- <input type="checkbox" v-model="todo.done"/> -->
                <span v-show="!todo.isEdit" >{{todo.title}}</span>
                <!-- @blur-绑定"失去焦点事件" -->
                <input
                    type="text" 
                    v-show="todo.isEdit"  
                    :value="todo.title" 
                    @blur="handleBlur(todo,$event)"
                    ref="inputTitle"
                >
            </label>
            <!-- todo.id-实参 -->
            <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
            <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
        </li>
    </transition>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name:'MyItem',
        //声明接收todo对象
        props:['todo'],
        methods: {
            //勾选or取消勾选
            handlecheck(id){
                //通知App组件将对应的todo对象的done值取反
                this.$bus.$emit('checkTodo',id)
            },
             //删除
             //id-形参
            handleDelete(id){
                if(confirm('确定删除吗？')){
                    //通知App组件将对应的todo对象删除
                    //this.$bus.$emit('deleteTodo',id)
                    pubsub.publish('deleteTodo',id)
                }
            },
            //编辑
            handleEdit(todo){
                if(todo.hasOwnProperty('isEdit')){
                    todo.isEdit = true
                }else{
                    console.log('@');
                    this.$set(todo,'isEdit',true)
                }
                //$nextTick所指定的回调函数会在DOM节点更新完毕之后再执行！[这里也就是在handleEdit(todo)函数里的内容全部执行完，DOM节点更新以后再回头来执行$nextTick内部的回调。程序的执行效率也会得到提升！]
                this.$nextTick(()=>{
                    //箭头函数没有自己的this，这里的this是上一级作用域下的this，即"vc的this"，从而实现调用vc中的$refs属性
                    //通过ref属性拿到👆的input元素后，会立刻在输入框中自动获取焦点
                    this.$refs.inputTitle.focus()
                })
            },
            //失去焦点回调（真正执行修改逻辑）
            //当input框失去焦点的一瞬间，blur事件被触发，调用handleBlur()函数，使todo.isEdit = false，input元素消失，文字重回span元素内
            handleBlur(todo,event){
                todo.isEdit = false
                //如果编辑后输入的字符串为空，则返回alert语句
                if(event.target.value === '') return alert('输入不能为空！')
                this.$bus.$emit('updateTodo',todo.id,event.target.value)

            }
        }
    }
</script>

<style scoped>
    /*item*/
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        float: right;
        display: none;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
    li:hover{
        background-color: #ddd;
    }
    li:hover button{
        display: block;
    }


    /* 动画进入时激活(进入过渡) */
    .todo-enter-active{
        /* animation: 关键帧名 动画持续时间 规定动画的速度曲线 
            animation: atguigu 1s linear; */
        animation: atguigu 0.5s linear;
    }
    /* 动画离开时激活(离开过渡) */
    .todo-leave-active{
        /* reverse-动画反转播放 */
        animation: atguigu 0.5s linear reverse;
    }

    @keyframes atguigu {
        from{
        transform: translateX(100%);
        }
        to{
        transform: translateX(0px);
        }
    }
</style>
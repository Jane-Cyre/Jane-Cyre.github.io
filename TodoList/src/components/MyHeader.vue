<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add"/>
        <!-- <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/> -->
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'
    export default {
        name:'MyHeader',
        data() {
            return {
                title:''
            }
        },
        methods: {

        //获取用户的输入

            //方法一： 利用"eventの事件对象"：event.target.value获得用户输入
            //注：event.target -> 返回触发该事件的元素（触发该事件的节点），👆上面所触发的事件的元素为<input/>元素
            add(e){

                //如果什么也不输入(相当于''空字符串)，则退出add()函数
                if(e.target.value === '') return alert('输入不能为空')

                //将用户的输入包装成一个todo对象
                const todoObj = {id:nanoid(), title:e.target.value, done:false}

                //通知App组件去添加一个todo对象
                this.$emit('addTodo',todoObj)

                //清空输入
                e.target.value = ''
                
            }

            /* //方法二：利用"v-model双向数据绑定"获得用户输入
            add(){
                console.log(this.title)
            } */
            
        },
    }
</script>

<style scoped>
    /*header*/
    .todo-header input {
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>
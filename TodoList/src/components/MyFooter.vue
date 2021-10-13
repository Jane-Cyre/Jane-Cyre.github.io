<template>
    <div class="todo-footer" v-show="total">
        <label>
            <!-- :check="true/false"，true则勾选，false则不勾选。这里需要满足isAll()中的返回条件才勾选 -->
            <input type="checkbox" :checked="isAll" @change="checkAll"/>
        </label>
        <span>
            <span>已完成{{doneTotal}}</span> / 全部{{total}}
        </span>
        <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
    export default {
        name:'MyFooter',
        props:['todos','checkAllTodo'],
        computed:{
            total(){
                return this.todos.length
            },
            doneTotal(){
                /*方法一： 
                let i = 0
                this.todos.forEach(todo => {
                    if(todo.done) i++
                })
                return i */


                //reduce -> 做数据统计，统计已完成的数目
                //pre -> 累加器累加的return的返回值，它由初始值0开始累加，相当于每一轮过后的的pre = return pre + todos，直至处理完数组中的每一个元素
                //current -> 数组当前正在处理的元素(这里相当于todos中的每一个对象{}，也就是todo)
                /*方法二：*/
                const x = this.todos.reduce((pre,current)=>{
                    return pre + (current.done ? 1 : 0)
                },0)
                return x

                /* 👆方法二の简写形式：
                return this.todos.reduce((pre,current)=>pre + (current.done ? 1 : 0),0) */
            },
            isAll(){
                return this.doneTotal === this.total && this.total > 0
            }
        },
        methods:{
            checkAll(e){
                this.checkAllTodo(e.target.checked)
            },
            //清空所有已完成
            clearAll(){
                // this.clearAllTodo()
                this.$emit('clearAllTodo')
            }
        }
    }
</script>

<style scoped>
    /*footer*/
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>
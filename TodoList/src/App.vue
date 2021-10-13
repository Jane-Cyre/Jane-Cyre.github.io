<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <MyHeader @addTodo="addTodo"/>
                <MyList :todos="todos"/>
                <MyFooter :todos="todos" :checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo"/>
            </div>
        </div>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    //引入Student组件
    import MyHeader from './components/MyHeader'
    import MyList from './components/MyList'
    import MyFooter from './components/MyFooter'

    export default {
        name:'App',
        components:{MyHeader,MyList,MyFooter},
        data() {
            return {
                //读取数据
                //由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
                //localStorage.getItem()方法用于"从存储中获取数据项"，刷新页面后如不写getItem，只写[]，则重新展示的页面todos为空。如写成XXgetItemXX||[]形式，则先检测之前是否有setItem保存过数据，如有，则执行||左边的getItem读取数据，之前新添加的todos中的项在页面刷新后依旧显示，如没有，则刷新后的页面todos项为空
                // todos:[]
                todos:JSON.parse(localStorage.getItem('todos')) || []
            }
        },
        methods:{
            //添加一个todo
            addTodo(todoObj){
                this.todos.unshift(todoObj)
            },
            //勾选or取消勾选一个todo
            checkTodo(id){
                //forEach()中回调函数的第一个参数element=>为todos里面的每一个起名为"todo"的项
                this.todos.forEach((todo) => {
                    //函数体
                    if(todo.id === id) todo.done = !todo.done                    
                });
            },
            //更新一个todo
            updateTodo(id,title){
                //forEach()中回调函数的第一个参数element=>为todos里面的每一个起名为"todo"的项
                this.todos.forEach((todo) => {
                    //函数体
                    if(todo.id === id) todo.title = title                    
                });
            },
            //删除一个todo，_占位，前面有第一个参数msgName，但是不用，所以利用_占位，保证能正常收到第二个参数
            deleteTodo(_,id){
                //过滤掉不需要的就是'删除'
                this.todos = this.todos.filter(todo => todo.id !== id)
            },
            //全选or取消全选
            checkAllTodo(done){
                this.todos.forEach(todo => {
                    todo.done = done
                })
            },
            //清除所有已经完成的todo
            clearAllTodo(){
                this.todos = this.todos.filter((todo)=>{
                    return todo.done === false  //如果没有任何数组元素通过测试，则返回空数组。！此时，将过滤得到所剩下的数组元素均为todo.done === false(即未完成)的数组元素
                })
            }
        },
        watch:{
            //监视属性在监视时，当todosの值发生变化(即当有todo对象{}被添加到todos数组[]中时，被存储的对象就是所对应のvalue)，watch就会执行{}内的代码
            todos:{
                deep:true,  //开启深度监视，用于监视对象的done属性（深度监视deep:true可以用于监测对象由外向内多层数据的变化，而普通的监视只能监视一层数据的变化）
                handler(value){
                    //保存数据
                    localStorage.setItem('todos',JSON.stringify(value))
                }
            }
        },
        mounted() {
            this.$bus.$on('checkTodo',this.checkTodo)
            this.$bus.$on('updateTodo',this.updateTodo)
            this.pubId = pubsub.subscribe('deleteTodo',this.deleteTodo)


        },
        beforeDestroy() {
            this.$bus.$off('checkTodo')
            this.$bus.$off('updateTodo')
            pubsub.unsubscribe(this.pubId)
        },
    }
</script>

<style>
    /*base*/
    body {
        background: #fff;
    }

    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-edit {
        color: #fff;
        background-color: skyblue;
        border: 1px solid rgb(103, 159, 180);
        margin-right: 5px;
    }

    .btn-danger:hover {
        color: #fff;
        background-color: #bd362f;
    }

    .btn:focus {
        outline: none;
    }

    .todo-container {
        width: 600px;
        margin: 0 auto;
    }
    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>
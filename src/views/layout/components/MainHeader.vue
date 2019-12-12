<template>
    <div class="header">
        <el-row class="nav">
            <div class="logo">
                <img src="../../../assets/image/index/logo.png" alt="" />
            </div>

            <el-row type="flex" justify="start" align="center" class="navs">
                <div
                    class="nav-item"
                    v-for="item in navList"
                    :key="item.index"
                    @mouseenter="navChild(item, 'show')"
                    @mouseleave="navChild(item, 'hide')"
                >
                    <router-link tag="a" :to="{ path: `/${item.link}` }">
                        {{ item.name }}
                    </router-link>
                    <div
                        class="nav-child-item"
                        v-if="item.children && item.children.length"
                    >
                        <el-collapse-transition>
                            <div v-show="activeNav === item.link">
                                <div
                                    class="transition-box"
                                    v-for="c_item in item.children"
                                    :key="c_item.index"
                                >
                                    <router-link
                                        tag="a"
                                        :to="{ path: c_item.link }"
                                        >{{ c_item.name }}</router-link
                                    >
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
            </el-row>
        </el-row>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppHeader',
    data() {
        return {
            show3: true,
            activeNav: '',
            navList: [
                {
                    index: '1',
                    name: '首页',
                    link: 'home',
                    children: [],
                },
                {
                    index: '2',
                    name: '精品课',
                    link: 'course',
                    children: [],
                },
                {
                    index: '3',
                    name: '职业路径',
                    link: 'skill',
                    children: [],
                },
                {
                    index: '4',
                    name: '班级',
                    link: 'classes',
                    children: [],
                },
                {
                    index: '5',
                    name: '商学院',
                    link: 'cloud',
                    children: [],
                },
                {
                    index: '6',
                    name: '活动',
                    link: 'community',
                    children: [],
                },
                {
                    index: '7',
                    name: '社区',
                    link: 'activity',
                    children: [],
                },
                {
                    index: '8',
                    name: '教学包',
                    link: 'resource',
                    children: [],
                },
                {
                    index: '9',
                    name: '备课区',
                    link: 'prepare',
                    children: [],
                },
            ],
            dialogVisible: false,
        }
    },
    methods: {
        navChild(item, isshow) {
            if (isshow === 'show') {
                this.activeNav = item.link
            } else {
                this.activeNav = null
            }
        },
        loginBox() {
            console.log(111)
            this.dialogVisible = true
        },
        handleClose() {},
    },
}
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    height: 70px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
    .nav {
        display: flex;
        // justify-content: space-between;
    }
}
.logo {
    margin-left: 40px;
    height: 100%;
    color: #ffffff;
    line-height: 60px;
}
.navs {
    margin-left: 30px;
}
.nav-item {
    width: auto;
    height: 70px;
    position: relative;
    text-align: center;
    & > a {
        position: relative;
        width: auto;
        display: inline-block;
        margin: 0 25px;
        height: 100%;
        line-height: 70px;
    }
    // &:hover {
    //   background-color: sandybrown;
    //   & > a {
    //     color: #ffffff;
    //   }
    // }
    & > div {
        width: 100%;
        // height: auto;
    }
}
.nav-child-item {
    position: absolute;
    z-index: 9;
    background-color: #ffffff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.07);
    color: #555555;
}
.search {
    margin-left: 45px;
    padding-top: 20px;
    position: relative;
    i {
        position: absolute;
        right: 14px;
        top: 27px;
        color: #8a9199;
    }
}
.search ::v-deep .el-input__inner {
    width: 200px;
    height: 30px;
    border-radius: 15px;
    background: #f2f2f2;
    border: none;
    padding: 0 20px;
}
.btns {
    line-height: 70px;
    flex: 1;
    color: #737980;
    text-align: right;
    .app-btn {
        margin-right: 52px;
        i {
            color: #737980;
            margin-right: 6px;
        }
    }
    .login-register {
        margin-right: 38px;
    }
    span a {
        color: #737980;
    }
}
.login-register > span,
.login-register a {
    display: inline-block;
    width: 100%;
    height: 100%;
    // color: #ffffff;
    font-size: 16px;
}
.dialog-box ::v-deep .el-dialog {
    border-radius: 5px;
}
.dialog-box ::v-deep .dialog-header {
    // padding: 30px 30px 20px 30px;
    border-bottom: 1px solid #dfe2e5;
    padding-bottom: 20px;
    span {
        border-bottom: 2px solid #242b33;
        padding-bottom: 20px;
        color: #0a121a;
        font-size: 16px;
    }
}
.dialog-box ::v-deep .el-dialog__body {
    padding: 0 30px 30px 30px;
    .dialog-content {
        padding-top: 50px;
        .login-btn {
            width: 100%;
            background: #ffd200;
            color: #993d1f;
            margin-bottom: 20px;
        }
        .remind-msg {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #8a9199;
            margin-bottom: 64px;
        }
        .text-remmind {
            text-align: center;
            margin-bottom: 20px;
            color: #8a9199;
        }
        .icons {
            text-align: center;
            span {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: inline-block;
                text-align: center;
                line-height: 40px;
                margin-right: 20px;
                i {
                    color: #fff;
                    font-size: 21px;
                }
                &:last-child {
                    margin-right: 0;
                }
            }

            .iconbg1 {
                background: #ffa000;
            }
            .iconbg2 {
                background: #42ad3b;
            }
            .iconbg3 {
                background: #ff000e;
            }
            .iconbg4 {
                background: #169ef4;
            }
        }
    }
    .el-input {
        margin-bottom: 20px;
    }
}
</style>

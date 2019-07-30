<template>
  <div class="database">
    <div class="margBot15 pad_t10">
      <i class="el-icon-s-management baseBlue"></i>
      <span>{{title}}</span>
    </div>
    <Card v-show="database.isExpand" :cardName="cardName" @on-submit="submitForm" @on-reset="resetForm">
      <el-collapse-transition>
        <el-form
          :model="database"
          :rules="rules"
          ref="database"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="数据库名称" prop="name">
            <el-input style="width: 50%;" v-model="database.name"></el-input>
            <span class="tip-text">名称为1-64个字符，只能包含数字、英文字符，或 “_”</span>
          </el-form-item>
          <el-form-item
            label="资源配额"
            required
          >
            <el-radio-group>
              <el-radio-button>自定义</el-radio-button>
            </el-radio-group>
            <el-form-item
              style="min-width: 300px;"
              class="inlineBlock"
              v-for="(item) in database.sliderData"
              :key="item.name"
              prop="defaultNum"
            >
              <el-slider
                :marks="{0:`${item.name}`}"
                :max="item.max"
                class="slider"
                v-model.number="item.defaultNum"
              ></el-slider>
              <el-input
                style="width:50px;"
                v-model="item.defaultNum"
              ></el-input>{{item.unit}}
            </el-form-item>

          </el-form-item>
          <el-form-item
            label="镜像"
            required
          >
            <el-col :span="6">
              <el-form-item prop="typeOption">
                <el-select
                  v-model="database.typeOption"
                  placeholder="请选择镜像类别"
                >
                  <el-option
                    v-for="item in database.option.types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="versionsOption">
                <el-select
                  v-model="database.versionsOption"
                  placeholder="请选择镜像版本"
                >
                  <el-option
                    v-for="item in database.option.versions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item
            label="账号"
            prop="userName"
          >
            <el-input
              style="width: 50%;"
              v-model="database.userName"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              style="width: 50%;"
              v-model="database.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-transition>
    </Card>
    <div v-show="!database.isExpand">
      <div class="smallForm">
        <span>{{database.name}}</span>
        <el-tooltip effect="dark" content="清除" placement="top">
          <i class="el-icon-circle-close iconSize pointer" @click="resetForm"></i>
        </el-tooltip>
        <el-tooltip effect="dark" content="编辑" placement="top">
          <i class="el-icon-edit-outline iconSize pointer" @click="editForm"></i>
        </el-tooltip>
      </div>
    </div>
    <el-button
      v-show="addBtn"
      class="margBot15"
      type="primary"
      :disabled="database.isDisabled"
      @click="addForm"
    >{{addBtn}}</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import Card from '@/components/card'
// eslint-disable-next-line
// import {cloneDeep} from 'lodash'
import {name, password} from '@/views/applicationCreator/validators'
// import {databaseSchema} from '@/views/applicationCreator/initFormData'

const formName = 'database'
// const database = databaseSchema

export default {
  name: 'Database',
  data () {
    return {
      title: '数据库',
      cardName: 'database',
      addBtn: '添加数据库',
      database: {
        name: '',
        userName: '',
        password: '',
        sliderData: [
          { max: 20, defaultNum: 0, unit: '核', name: 'CPU' },
          { max: 20, defaultNum: 0, unit: 'G', name: '内存' },
          { max: 20, defaultNum: 0, unit: 'G', name: '存储' }
        ],
        option: {
          types: [
            {
              value: '选项1',
              label: '1'
            },
            {
              value: '选项2',
              label: '2'
            }
          ],
          versions: [
            {
              value: '选项1',
              label: '1'
            },
            {
              value: '选项2',
              label: '2'
            }
          ]
        },
        typeOption: '',
        versionsOption: '',
        isDisabled: true,
        isExpand: true
      },
      rules: {
        name: [
          { required: true, message: '请输入数据库名称', trigger: 'blur' },
          { validator: name, trigger: 'blur' }
        ],
        typeOption: [
          { required: true, message: '请选择镜像类别', trigger: 'blur' }
        ],
        versionsOption: [
          { required: true, message: '请选择镜像版本', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, validator: password, trigger: 'blur' }
        ]
      }
    }
  },

  components: {
    Card
  },
  mounted () {
    // this.setInitialDatabase()
  },
  methods: {
    // setInitialDatabase () {
    //   // 深度克隆schema 防止引用污染
    //   let cloned = _.cloneDeep(databaseSchema) // eslint-disable-line
    //   // 存入初始化的数组
    //   this.initialDatabase.push(cloned)
    // },
    submitForm () {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.database.isDisabled = false
          this.database.isExpand = false
        } else {
          this.database.isDisabled = true
          return false
        }
      })
    },
    resetForm () {
      this.$refs[formName].resetFields()
      this.database.isDisabled = true
    },
    addForm () {
      // this.setInitialDatabase()
      // this.initialDatabase[index].isExpand = false
      console.log(this.database)
    },
    editForm () {
      this.database.isExpand = true
      // this.database.isDisabled = true
    }
  }
}
</script>

<style lang="less" scoped>
  .smallForm {
    margin: 10px 0;
    padding: 10px;
    height: 20px;
    width: 300px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
</style>

<template>
  <div class="storage">
    <div class="margBot15 pad_t10">
      <i class="el-icon-s-management baseBlue"></i>
      <span>{{title}}</span>
    </div>
    <el-collapse-transition>
      <Card v-show="storage.isExpand" :cardName="cardName" :addBtn="addBtn" @on-submit="submitForm" @on-reset="resetForm" :nameIndex="$attrs.nameIndex">
        <el-form
          :model="storage"
          ref="storage"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="存储名称" prop="name">
            <el-input style="width: 50%;" v-model="storage.name"></el-input>
            <span class="tip-text">名称为1-64个字符，只能包含数字、英文字符，或 “_”</span>
          </el-form-item>
          <el-form-item
            label="挂载目录"
            prop="mountName"
          >
            <el-input
              style="width: 50%;"
              v-model="storage.mountName"
              placeholder="请输入挂载目录"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="资源配额"
            required
          >
            <el-radio-group>
              <el-radio-button>自定义</el-radio-button>
            </el-radio-group>
            <el-slider
              v-bind:marks="storage.marks"
              :max="storage.max"
              class="slider"
              v-model.number="storage.resouceQuota"
            ></el-slider>
            <el-input
              style="width:50px;"
              v-model="storage.resouceQuota"
            ></el-input>{{storage.sliderUnit}}
          </el-form-item>
          <el-form-item
            label="副本数量"
            prop="optionValue"
          >
            <el-select
              v-model="storage.optionValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in storage.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="访问属性"
            prop="accessAttributes"
            required
          >
            <el-radio
              v-model="storage.accessAttributes"
              label="1"
            >读写</el-radio>
            <el-radio
              v-model="storage.accessAttributes"
              label="2"
            >只读</el-radio>
            <el-tooltip
              class="item"
              effect="dark"
              content="提示文字"
              placement="right"
            >
              <i
                class="el-icon-question icon-q"
              ></i>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </Card>
    </el-collapse-transition>
    <div v-show="!storage.isExpand">
      <div class="smallForm">
        <span>{{storage.name}}</span>
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
      :disabled="storage.isDisabled"
      @click="addForm"
    >{{addBtn}}</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import Card from '@/components/card'
// eslint-disable-next-line
// import {cloneDeep} from 'lodash'
import {name} from '@/views/applicationCreator/validators'
// import {storageSchema} from '@/views/applicationCreator/initFormData'

const formName = 'storage'
// const storage = storageSchema

export default {
  name: 'Storage',
  // props: {
  //   nameIndex: {
  //     type: Number,
  //     default: 1
  //   }
  // },
  data () {
    return {
      title: '存储',
      cardName: 'storage',
      addBtn: '添加存储',
      storage: {
        name: '',
        mountName: '',
        resouceQuota: 0,
        max: 20,
        marks: {
          0: '存储',
          20: '20G'
        },
        sliderUnit: 'G',
        accessAttributes: '1',
        options: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2'
          }
        ],
        optionValue: '',
        isDisabled: true,
        isExpand: true
      },
      rules: {
        name: [
          { required: true, message: '请输入存储名称', trigger: 'blur' },
          { validator: name, trigger: 'blur' }
        ],
        mountName: [
          { required: true, message: '请输入挂载目录', trigger: 'blur' }
        ],
        optionValue: [
          { required: true, message: '请选择副本数量', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Card
  },
  mounted () {
    // this.setInitialStorage()
  },
  methods: {
    // setInitialStorage () {
    //   // 深度克隆schema 防止引用污染
    //   let cloned = _.cloneDeep(storageSchema) // eslint-disable-line
    //   // 存入初始化的数组
    //   this.initialStorage.push(cloned)
    // },
    validate () {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.storage.isDisabled = false
          this.storage.isExpand = false
        } else {
          this.storage.isDisabled = true
          return false
        }
      })
    },
    submitForm () {
      this.validate()
    },
    resetForm () {
      this.$refs[formName].resetFields()
      this.storage.isDisabled = true
      this.storage.isExpand = true
    },
    addForm () {
      // this.validate()
      // this.setInitialStorage()
      // this.storage.isExpand = false
      console.log(this.storage)
    },
    editForm () {
      this.storage.isExpand = true
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

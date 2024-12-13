<template>
  <div class="w-full relative">
    <input
      type="text"
      v-model="search"
      :placeholder="placeholder"
      class=" text-black combobox-input"
      @focus="showDropdown = true"
      @blur="hideDropdown"
      @input="filterItems"
    />
    <ul v-if="showDropdown" class="dropdown-menu list-none ">
      <li
        v-for="(item,idx) in filteredItems"
        :key="idx"
        class="dropdown-item"
        @mousedown="selectItem(item)"
      >
        {{ itemText?item[itemText]:item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomCombobox",
  props: {
    items: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    itemText: {
      type: String,
      required:false,
    },
    searcherFunc:{
      type:Function,
      default:()=>{}
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      search: "",
      showDropdown: false,
      filteredItems: [],
    };
  },
  watch: {
    search(newValue) {
      this.filterItems();
    },
    items: {
      immediate: true,
      handler(newValue) {
        this.filteredItems = newValue;
      }
    },
  },
  methods: {
    filterItems() {

      if(!this.itemText){
        this.filteredItems = this.items.filter((item) =>
          item.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if(this.itemText){
        this.filteredItems = this.items
        .filter(item => item[this.itemText] && item[this.itemText].toLowerCase().includes(this.search.toLowerCase()))
      }
    },
    selectItem(item) {
      if(!this.itemText){
        this.search = item;
      }
      if(this.itemText){
        this.search = item[this.itemText];
      }
      this.$emit("input", item); // Tanlangan qiymatni tashqi komponentga uzatish

      this.showDropdown = false;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 150); // Fokus yo'qolganda dropdownni yashirish
    },
  },

};
</script>

<style scoped>
.custom-combobox {
  position: relative;
  width: 300px;
}

.combobox-input {
  @apply w-full p-2 bg-andaza-secondary-bg rounded-lg h-[44px] outline-andaza-primary-bg focus:border-andaza-primary-bg focus:ring-1 focus:ring-andaza-primary-bg text-base
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style-type: none;
  padding: 0;
}

.dropdown-item {
  @apply px-2 py-3 cursor-pointer
}

.dropdown-item:hover {
  background: #f5f5f5;
}
</style>

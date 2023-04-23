<template>
  <div class="pagination" v-if="totalPages !== 0">
    <div>
      <button :disabled="!canPrev" @click="toPrevPage" id="prev-btn">Prev</button>
      <button
        v-for="page in currentButtonNumbers"
        :key="page"
        :class="{ 'current-page': page === currentPage }"
        @click="toPage(page)"
      >
        {{ page }}
      </button>
      <button :disabled="!canNext" @click="toNextPage" id="next-btn">Sig</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  emits: ['select-page'],
  props: {
    currentPage: {
      type: Number as PropType<number>,
      default: 1
    },
    totalPages: {
      type: Number as PropType<number>,
      default: 1
    },
    blockPages: {
      type: Number as PropType<number>,
      default: 5
    }
  },
  computed: {
    maxButtonBlocks(): number {
      if (this.totalPages % this.blockPages === 0) {
        return this.totalPages / this.blockPages
      }
      return ((this.totalPages / this.blockPages) << 0) + 1
    },
    currentButtonBlock(): number {
      if (this.currentPage % this.blockPages === 0) {
        return this.currentPage / this.blockPages
      }
      return ((this.currentPage / this.blockPages) << 0) + 1
    },
    currentButtonNumbers(): number[] {
      const buttonNumbers: number[] = []
      const [lastButtonNumberOfBlock, firstButtonNumberOfBlock] = (() => {
        if (this.currentButtonBlock === this.maxButtonBlocks) {
          return [this.totalPages, this.currentButtonBlock * this.blockPages - this.blockPages + 1]
        }
        return [
          this.currentButtonBlock * this.blockPages,
          this.currentButtonBlock * this.blockPages - this.blockPages + 1
        ]
      })()
      for (let i = firstButtonNumberOfBlock; i <= lastButtonNumberOfBlock; i++) {
        buttonNumbers.push(i)
      }
      return buttonNumbers
    },
    canNext(): boolean {
      return this.currentPage != this.totalPages
    },
    canPrev(): boolean {
      return this.currentPage != 1
    }
  },
  methods: {
    toPage(page: number): void {
      this.$emit('select-page', page)
    },
    toPrevPage(): void {
      this.toPage(this.currentPage - 1)
    },
    toNextPage(): void {
      this.toPage(this.currentPage + 1)
    }
  }
})
</script>
<style lang="css" scoped>
.pagination {
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row-reverse;
}

.pagination > div {
  width: fit-content;
}

.pagination > div > .current-page {
  box-shadow: inset 0px 0px 400px 110px rgba(0, 0, 0, 0.5);
}

.pagination > div > button {
  background-color: #696cff;
  color: white;
  border: 0;
  padding: 0.5rem;
  cursor: pointer;
}

.pagination > div > button:hover {
  opacity: 0.8;
}
.pagination > div > button:disabled {
  background-color: gray;
}

#next-btn {
  border-radius: 0 0.3rem 0.3rem 0;
}

#prev-btn {
  border-radius: 0.3rem 0 0 0.3rem;
}
</style>

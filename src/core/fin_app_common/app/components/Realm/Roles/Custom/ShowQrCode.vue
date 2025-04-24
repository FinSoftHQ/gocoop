<template>
    <div>
        <FPartTitle icon="i-heroicons-document"
            :actions>
            {{ title }}
        </FPartTitle>
        <RealmCardView :pageId="pageDef.pageId"
            :initial="data">
            <template v-if="$slots.default"
                #default="{ wrapped, entries, resolver }">
                <slot :wrapped
                    :entries
                    :resolver></slot>
            </template>
        </RealmCardView>
    </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
    pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, actions, data, status, error } = useRoleForView(props.pageId);
</script>
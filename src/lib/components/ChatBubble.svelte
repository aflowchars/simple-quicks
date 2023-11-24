<script>
	import { MoreHorizontalIcon } from '$lib/icons';
	import {
		Popover,
		PopoverButton,
		PopoverPanel
	} from '@rgossiaux/svelte-headlessui';

	export let align = '';
	export let variant = '';
	export let full_name = '';
	export let text_content = '';
	export let date_time = '';
</script>

<figure
	class="relative flex flex-col {align === 'start'
		? 'items-start self-start'
		: 'items-end self-end'}"
>
	<h5
		class="mb-1.5 text-base font-bold {(variant === 'cs-in' &&
			'text-primary-2f80ed') ||
			(variant === 'cs-out' && 'text-chats-9b51e0') ||
			(variant === 'uc-in-1' && 'text-chats-e5a443') ||
			(variant === 'uc-in-2' && 'text-chats-43b78d') ||
			(variant === 'uc-out' && 'text-chats-9b51e0')}"
	>
		{full_name}
	</h5>

	<div
		class="relative flex max-w-[456px] flex-col items-start gap-3 rounded-[5px] {(variant ===
			'cs-in' &&
			'bg-[#F8F8F8]') ||
			(variant === 'cs-out' && 'bg-chats-eedcff') ||
			(variant === 'uc-in-1' && 'bg-chats-fceed3') ||
			(variant === 'uc-in-2' && 'bg-chats-d2f2ea') ||
			(variant === 'uc-out' && 'bg-chats-eedcff')} p-2.5"
	>
		{#if variant !== 'cs-in'}
			<Popover
				class="absolute {variant.includes('-in')
					? '-left-6'
					: '-right-6'} top-0 flex flex-col items-start"
			>
				<PopoverButton class="h-4 w-4 rounded-sm hover:bg-primary-828282/5">
					<MoreHorizontalIcon class="h-4 w-4 text-primary-4f4f4f" />
				</PopoverButton>

				<PopoverPanel
					class="flex w-32 flex-col items-start rounded-md border border-[#BDBDBD] bg-white"
				>
					<button
						class="w-full border-b border-[#bdbdbd] pb-1 pl-5 pt-2 text-left text-base text-primary-2f80ed transition-all duration-300 ease-in-out last:border-b-0 hover:bg-primary-828282/10"
					>
						Edit
					</button>

					<button
						class="w-full border-b border-[#bdbdbd] pb-2 pl-5 pt-1 text-left text-base text-indicator-eb5757 transition-all duration-300 ease-in-out last:border-b-0 hover:bg-primary-828282/10"
					>
						Delete
					</button>
				</PopoverPanel>
			</Popover>
		{/if}

		<p class="text-base font-normal leading-tight text-primary-4f4f4f">
			{text_content}
		</p>

		<span class="text-sm font-normal text-primary-4f4f4f"> {date_time} </span>
	</div>
</figure>

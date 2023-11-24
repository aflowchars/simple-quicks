<script>
	//------------------------------------------------------------------------------------//
	import { current_page } from '$lib/stores';

	import { PersonIcon } from '$lib/icons';
	//------------------------------------------------------------------------------------//
	// Chats Data
	//------------------------------------------------------------------------------------//
	/**
	 * @type {any} chats
	 */
	export let chats;
	//------------------------------------------------------------------------------------//

	/**
	 * @param {any} chat
	 */
	const updatePage = (chat) => {
		if (chat.chat_type === 'customer_service') {
			$current_page = '/chat_customer_service';
		} else if (chat.chat_type === 'person') {
			$current_page = '/chat_user_conversation';
		}
	};
	//------------------------------------------------------------------------------------//
</script>

{#each chats as chat, index}
	<button
		type="button"
		on:click={() => updatePage(chat)}
		class="relative flex w-full flex-row items-start pb-8 pt-5 transition-all duration-300 ease-in-out hover:bg-primary-828282/10"
	>
		<div class="mr-[17px] flex-shrink-0 pl-6">
			{#if chat.chat_type === 'person'}
				<div class="flex w-12 flex-row items-center justify-center">
					<span
						class="relative z-0 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary-e0e0e0"
					>
						<PersonIcon class="h-[18px] w-[18px] text-black opacity-[0.54]" />
					</span>

					<span
						class="relative z-10 -ml-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary-2f80ed"
					>
						<PersonIcon class="h-[18px] w-[18px] text-white" />
					</span>
				</div>
			{:else}
				<div class="flex h-full w-12 items-center justify-center">
					<span
						class="relative z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary-2f80ed"
					>
						<h5 class="text-base font-bold text-white">{chat.title[0]}</h5>
					</span>
				</div>
			{/if}
		</div>

		<div class="-mt-px flex flex-col items-start">
			<div class="mb-2 flex flex-row items-start gap-[17px]">
				<h5
					class="max-w-[446px] text-left text-base font-bold leading-none text-primary-2f80ed"
				>
					{chat.title ?? ''}
				</h5>

				<p class="text-sm font-normal text-primary-4f4f4f">
					{chat.time_date ?? ''}
				</p>
			</div>

			<div class="flex flex-col items-start text-primary-4f4f4f">
				{#if chat.chat_type === 'person'}
					<h5 class="text-base font-bold leading-none">
						{chat.full_name}:
					</h5>
				{/if}

				<p class={chat.chat_type === 'person' ? '-mt-0' : '-mt-2'}>
					{chat.text_content}
				</p>
			</div>
		</div>

		{#if !chat.is_readed}
			<span
				class="absolute bottom-[38px] right-6 h-2.5 w-2.5 rounded-full bg-indicator-eb5757"
			/>
		{/if}

		{#if chats.length - 1 !== index}
			<div class="absolute bottom-0 left-0 w-full px-6">
				<div class="h-px w-full border-b border-primary-828282" />
			</div>
		{/if}
	</button>
{/each}

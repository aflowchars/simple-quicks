<script>
	//------------------------------------------------------------------------------------//
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	import {
		Dialog,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	import { ChatBubble, ChatList } from '$lib/components';

	import {
		ArrowBackIcon,
		ArrowDownwardIcon,
		CloseIcon,
		LoadingBlueIcon,
		LoadingIcon,
		SearchIcon
	} from '$lib/icons';

	import {
		current_page,
		show_loader_chat_cs,
		show_modal_chat
	} from '$lib/stores';

	//------------------------------------------------------------------------------------//
	// Props - Modal Inbox
	//------------------------------------------------------------------------------------//
	/**
	 * @type {any}
	 */
	export let chat_data;
	/**
	 * @type {any}
	 */
	export let chat_customer_service;
	/**
	 * @type {{ [x: string]: any; }}
	 */
	export let chat_user_conversation;

	//------------------------------------------------------------------------------------//
	// Show All Data
	//------------------------------------------------------------------------------------//

	// Chat List
	let show_all_chat = false;

	setTimeout(() => {
		show_all_chat = true;
	}, 3000);

	// Loader for show new message
	$: show_new_message = true;

	/**
	 * @type {number} conversation_clientHeight
	 */
	let conversation_clientHeight;

	/**
	 * @type {HTMLElement | null}
	 */
	let conversation_element_user;

	//------------------------------------------------------------------------------------//
</script>

<!-- ------------------------------------------ START: Modal for Inbox ------------------------------------------ -->
<Transition show={$show_modal_chat}>
	<Dialog
		on:close={() => {
			$show_modal_chat = false;
			$current_page = '/';
		}}
	>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<section
				class="absolute {$show_modal_chat
					? '!bottom-[71px]'
					: '!bottom-16'} right-[37px] my-8 inline-block h-[737px] w-[734px] origin-right transform overflow-hidden rounded-md border-[#333] bg-white {$current_page !==
				'chat_list'
					? 'p-0 pr-2.5'
					: 'py-6 pr-2.5'} text-left align-middle shadow-xl transition-all"
			>
				{#if $current_page === '/chat_list'}
					<!-- ----------------------------------- START: Chat List ----------------------------------- -->
					<section class="chat-list flex h-full w-full flex-col items-start">
						<!-- ----------------------------------- START: Search Input ----------------------------------- -->
						<nav class="w-full pt-5">
							<div class="relative w-full pl-6 pr-3.5">
								<input
									type="text"
									placeholder="Search"
									class="w-full rounded-[5px] border border-primary-828282 px-[58px] py-2 outline-0 placeholder:text-[#333]"
								/>

								<SearchIcon
									class="absolute right-[58px] top-1/2 h-3 w-3 -translate-y-1/2 text-[#333]"
								/>
							</div>
						</nav>
						<!-- ----------------------------------- END: Search Input ----------------------------------- -->

						<!-- ----------------------------------- START: Loader ----------------------------------- -->
						{#if show_all_chat === false}
							<div
								class="flex h-full w-full flex-col items-center justify-center"
							>
								<LoadingIcon class="h-[86px] w-[86px] animate-spin" />
								<p class="text-base font-bold text-primary-4f4f4f">
									Loading Chats...
								</p>
							</div>
						{:else}
							<div
								class="mt-1.5 flex h-full w-full flex-1 flex-col items-start overflow-y-auto"
							>
								<ChatList chats={chat_data} />
							</div>
						{/if}
						<!-- ----------------------------------- END: Loader ----------------------------------- -->
					</section>
					<!-- ----------------------------------- END: Chat List ----------------------------------- -->
				{:else if $current_page === '/chat_customer_service'}
					<!-- ----------------------------------- START: Customer Service ----------------------------------- -->
					<section
						transition:fly={{
							delay: 0,
							duration: 300,
							x: 128,
							opacity: 0,
							easing: quadInOut
						}}
						class="relative flex h-full w-full flex-col items-start"
					>
						<!-- ----------------------------------- START: Navigation ----------------------------------- -->
						<nav
							class="fixed left-0 top-0 z-10 flex h-[72px] w-full flex-row items-center gap-3.5 border-b border-[#bdbdbdb] bg-white px-5 py-6"
						>
							<!-- Back -->
							<button
								type="button"
								on:click={() => {
									$current_page = '/chat_list';
									$show_loader_chat_cs = false;
									console.log($show_loader_chat_cs);
								}}
							>
								<ArrowBackIcon class="h-6 w-6 text-[#333333]" />
							</button>

							<!-- Title -->
							<h1 class="text-lg font-bold text-primary-2f80ed">
								FastVisa Support
							</h1>

							<button
								type="button"
								on:click={() => {
									$show_modal_chat = false;
									$current_page = '/';
								}}
							>
								<CloseIcon
									class="absolute right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#333333]"
								/>
							</button>
						</nav>
						<!-- ----------------------------------- END: Navigation ----------------------------------- -->

						<!-- ----------------------------------- START: Conversation ----------------------------------- -->
						<section
							bind:clientHeight={conversation_clientHeight}
							class="mt-[86px] flex h-full w-full max-w-full flex-1 flex-col gap-3.5 overflow-y-auto overflow-x-hidden bg-white px-5 pb-6 pr-2.5"
						>
							{#each chat_customer_service as { id, align, full_name, date_time, variant, text_content }}
								<ChatBubble
									{align}
									{variant}
									{date_time}
									{full_name}
									{text_content}
								/>
							{/each}
						</section>
						<!-- ----------------------------------- END: Conversation ----------------------------------- -->

						<!-- ----------------------------------- START: Send Chat ----------------------------------- -->
						<div
							class="relative flex w-full flex-col items-start pl-5 pr-2.5 pt-2.5"
						>
							{#if $show_loader_chat_cs}
								<section
									transition:fly={{
										delay: 0,
										duration: 150,
										y: 24,
										opacity: 0,
										easing: quadInOut
									}}
									class="loader relative mb-2.5 flex w-full flex-row items-center gap-3 rounded-[5px] bg-[#E9F3FF] p-2.5"
								>
									<LoadingBlueIcon class="h-[35px] w-[35px] animate-spin" />

									<span class="text-sm font-bold text-primary-4f4f4f">
										Please wait while we connect you with one of our team ...
									</span>
								</section>
							{/if}

							<form class="flex w-full flex-row items-center gap-3.5 py-5 pt-0">
								<input
									type="text"
									placeholder="Type a new message"
									class="relative h-10 w-full rounded-[5px] border border-primary-828282 px-4 py-2.5 outline-none placeholder:text-[#333] focus:ring-2 focus:ring-primary-2f80ed/10"
								/>

								<button
									type="button"
									on:click={() => {
										console.log($show_loader_chat_cs, 'ok');
										$show_loader_chat_cs = true;
									}}
									class="relative rounded-[5px] bg-primary-2f80ed px-4 py-2 font-bold text-white"
								>
									Send
								</button>
							</form>
						</div>

						<!-- ----------------------------------- END: Send Chat ----------------------------------- -->
					</section>
					<!-- ----------------------------------- END: Customer Service ----------------------------------- -->
				{:else if $current_page === '/chat_user_conversation'}
					<!-- ----------------------------------- START: User Conversation ----------------------------------- -->
					<section
						transition:fly={{
							delay: 0,
							duration: 300,
							x: 128,
							opacity: 0,
							easing: quadInOut
						}}
						class="relative flex h-full w-full flex-col items-start"
					>
						<!-- ----------------------------------- START: Navigation ----------------------------------- -->
						<nav
							class="fixed left-0 top-0 z-10 flex h-[72px] w-full flex-row items-center gap-3.5 border-b border-[#bdbdbdb] bg-white px-5 py-6"
						>
							<!-- Back -->
							<button
								type="button"
								on:click={() => {
									$current_page = '/chat_list';
									show_new_message = true;
								}}
							>
								<ArrowBackIcon class="h-6 w-6 text-[#333333]" />
							</button>

							<!-- Title -->
							<div class="w-full space-y-px">
								<h1
									class="w-11/12 truncate text-lg font-bold text-primary-2f80ed"
								>
									I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
								</h1>

								<p class="text-sm text-[#333]">3 Participants</p>
							</div>

							<button
								type="button"
								on:click={() => {
									$show_modal_chat = false;
									$current_page = '/';
								}}
							>
								<CloseIcon
									class="absolute right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#333333]"
								/>
							</button>
						</nav>
						<!-- ----------------------------------- END: Navigation ----------------------------------- -->

						<!-- ----------------------------------- START: Conversation ----------------------------------- -->
						<section
							bind:this={conversation_element_user}
							bind:clientHeight={conversation_clientHeight}
							class="mt-[86px] flex h-full w-full flex-1 flex-col gap-3.5 overflow-y-auto overflow-x-hidden bg-white px-5 pb-6 pr-2.5"
						>
							<!-- ----------------------------------- START: Separator ----------------------------------- -->
							<div class="flex w-full flex-row items-center gap-6 py-6">
								<span class="h-px w-full bg-primary-4f4f4f"></span>
								<span class="whitespace-nowrap font-bold text-primary-4f4f4f">
									Today June 08, 2021
								</span>
								<span class="h-px w-full bg-primary-4f4f4f"></span>
							</div>
							<!-- ----------------------------------- END: Separator ----------------------------------- -->

							<!-- ----------------------------------- START: Yesterday ----------------------------------- -->
							{#each chat_user_conversation['Yesterday June 08, 2021'] as { align, full_name, date_time, variant, text_content }}
								<ChatBubble
									{align}
									{variant}
									{date_time}
									{full_name}
									{text_content}
								/>
							{/each}
							<!-- ----------------------------------- END: Yesterday ----------------------------------- -->

							<!-- ----------------------------------- START: Separator ----------------------------------- -->
							<div class="flex w-full flex-row items-center gap-6 py-6">
								<span class="h-px w-full bg-primary-4f4f4f"></span>
								<span class="whitespace-nowrap font-bold text-primary-4f4f4f">
									Today June 09, 2021
								</span>
								<span class="h-px w-full bg-primary-4f4f4f"></span>
							</div>
							<!-- ----------------------------------- END: Separator ----------------------------------- -->

							<!-- ----------------------------------- START: Yesterday ----------------------------------- -->
							{#each chat_user_conversation['Today June 09, 2021'] as { align, full_name, date_time, variant, text_content }}
								<ChatBubble
									{align}
									{variant}
									{date_time}
									{full_name}
									{text_content}
								/>
							{/each}
							<!-- ----------------------------------- END: Yesterday ----------------------------------- -->

							<!-- ----------------------------------- START: Separator ----------------------------------- -->
							<div class="flex w-full flex-row items-center gap-6 py-6">
								<span class="h-px w-full bg-[#EB5757]"></span>
								<div class="flex flex-row items-center gap-1">
									<span class="whitespace-nowrap font-bold text-[#EB5757]">
										New Message
									</span>
									<ArrowDownwardIcon class="h-4 w-4 text-[#EB5757]" />
								</div>
								<span class="h-px w-full bg-[#EB5757]"></span>
							</div>
							<!-- ----------------------------------- END: Separator ----------------------------------- -->

							<!-- ----------------------------------- START: New Message ----------------------------------- -->
							{#each chat_user_conversation['New Message'] as { align, full_name, date_time, variant, text_content }}
								<ChatBubble
									{align}
									{variant}
									{date_time}
									{full_name}
									{text_content}
								/>
							{/each}
							<!-- ----------------------------------- END: New Message ----------------------------------- -->
						</section>
						<!-- ----------------------------------- END: Conversation ----------------------------------- -->

						<!-- ----------------------------------- START: Send Chat ----------------------------------- -->
						<div
							class="relative flex w-full flex-col items-start pb-5 pl-5 pr-2.5 {show_new_message
								? 'pt-2.5'
								: 'pt-5'}"
						>
							{#if show_new_message}
								<div
									transition:fly={{
										delay: 0,
										duration: 300,
										y: 32,
										opacity: 0,
										easing: quadInOut
									}}
									class="mb-3 flex w-full flex-row justify-center"
								>
									<button
										type="button"
										on:click={() => {
											conversation_element_user?.scrollTo({
												top: conversation_clientHeight,
												behavior: 'smooth'
											});

											show_new_message = false;
										}}
										class="flex flex-row items-center justify-center gap-1 rounded-[5px] bg-[#E9F3FF] px-3 py-2 transition-all duration-300 ease-in-out hover:bg-[#2F80ED]/25"
									>
										<span class="whitespace-nowrap font-bold text-[#2F80ED]">
											New Message
										</span>

										<ArrowDownwardIcon class="h-4 w-4 text-[#2F80ED]" />
									</button>
								</div>
							{/if}

							<section class="flex w-full flex-row items-center gap-3.5">
								<input
									type="text"
									placeholder="Type a new message"
									class="relative h-10 w-full rounded-[5px] border border-primary-828282 px-4 py-2.5 outline-none placeholder:text-[#333] focus:ring-2 focus:ring-primary-2f80ed/10"
								/>

								<button
									type="submit"
									class="relative rounded-[5px] bg-primary-2f80ed px-4 py-2 font-bold text-white"
								>
									Send
								</button>
							</section>
						</div>

						<!-- ----------------------------------- END: Send Chat ----------------------------------- -->
					</section>
					<!-- ----------------------------------- END: User Conversation ----------------------------------- -->
				{/if}
			</section>
		</TransitionChild>
	</Dialog>
</Transition>
<!-- ------------------------------------------ END: Modal for Inbox ------------------------------------------ -->

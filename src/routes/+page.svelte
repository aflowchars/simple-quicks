<script>
	//------------------------------------------------------------------------------------//
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	import { ModalInbox, ModalTask } from '$lib/components';

	import { current_page, show_modal_chat, show_modal_task } from '$lib/stores';

	import {
		ChromeReaderModeIcon,
		CloudLightning,
		QuestionAnswerIcon,
		SearchIcon
	} from '$lib/icons';

	//------------------------------------------------------------------------------------//
	// Show All CTA
	//------------------------------------------------------------------------------------//
	let show_all_cta = false;

	//------------------------------------------------------------------------------------//
	// Modal
	//------------------------------------------------------------------------------------//
	const openModalChat = () => {
		$show_modal_chat = true;
		$current_page = '/chat_list';
	};

	const openModalTask = () => {
		$show_modal_task = true;
		$current_page = '/task_list';
	};
	//------------------------------------------------------------------------------------//
	// Chat Data
	//------------------------------------------------------------------------------------//
	/** @type {import('./$types').PageData} */
	export let data;

	const {
		chat_data,
		chat_customer_service,
		chat_user_conversation,
		task_list
	} = data;
	//------------------------------------------------------------------------------------//
</script>

<svelte:head>
	<title>Foundation &mdash; Simple Quicks</title>
</svelte:head>

<main
	class="relative flex min-h-screen flex-row items-start bg-[#333333] text-white"
>
	<!-- ------------------------------------------ START: Sidebar ------------------------------------------ -->
	<div class="h-screen basis-[283px] border-r border-[#f2f2f2]"></div>
	<!-- ------------------------------------------ END: Sidebar ------------------------------------------ -->

	<!-- ------------------------------------------ START: Main ------------------------------------------ -->
	<div class="relative w-full">
		<SearchIcon
			class="absolute left-[26px] top-[19px] h-4 w-4 text-[#f2f2f2]"
		/>

		<input
			type="text"
			class="h-[58px] w-full bg-primary-4f4f4f pl-16 outline-none"
		/>
	</div>
	<!-- ------------------------------------------ END: Main ------------------------------------------ -->
</main>

<!-- ------------------------------------------ START: Call To Action ------------------------------------------ -->
<div
	class="fixed bottom-[27px] right-[34px] flex transition-all duration-300 ease-in-out {($show_modal_chat &&
		'flex-row') ||
		($show_modal_task && 'flex-row-reverse')} items-end {$show_modal_chat
		? 'gap-0'
		: 'gap-[26px]'}"
>
	{#if show_all_cta}
		<!-- ---------------------------------- START: Button for Task ---------------------------------- -->
		<div
			transition:fly={{
				delay: 250,
				duration: 300,
				x: 300,
				opacity: 0,
				easing: quadInOut
			}}
			class="flex flex-col items-center gap-1 rounded-full"
		>
			<p
				class="text-xs text-white {$show_modal_chat || $show_modal_task
					? 'hidden'
					: 'block'}"
			>
				Task
			</p>

			<button
				type="button"
				on:click={openModalTask}
				class="relative {$show_modal_task
					? 'bg-[#F8B76B] hover:bg-[#F8B76B]/90'
					: 'bg-[#f2f2f2] hover:bg-[#f2f2f2]/90'} transition-all duration-500 ease-in-out {$show_modal_task
					? 'before:absolute before:-left-3 before:top-0 before:-z-10 before:h-full before:w-full before:cursor-pointer before:rounded-full before:bg-primary-4f4f4f'
					: ''} flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all duration-500 ease-in-out"
			>
				<ChromeReaderModeIcon
					class="h-7 w-7 {$show_modal_task ? 'text-white' : 'text-[#f8b76b]'}"
				/>
			</button>
		</div>
		<!-- ---------------------------------- END: Button for Task ---------------------------------- -->

		<!-- ---------------------------------- START: Button for Inbox ---------------------------------- -->
		<div
			transition:fly={{
				delay: 0,
				duration: 300,
				x: 300,
				opacity: 0,
				easing: quadInOut
			}}
			class="flex flex-col items-center gap-1 rounded-full {$show_modal_chat
				? 'ml-[26px]'
				: 'ml-0'}"
		>
			<p
				class="text-xs text-white {$show_modal_chat || $show_modal_task
					? 'hidden'
					: 'block'}"
			>
				Inbox
			</p>

			<button
				type="button"
				on:click={openModalChat}
				class="relative {$show_modal_chat
					? 'bg-[#8885ff] hover:bg-[#8885ff]/90'
					: 'bg-[#f2f2f2] hover:bg-[#f2f2f2]/90'} transition-all duration-500 ease-in-out {$show_modal_chat
					? 'before:absolute before:-left-3 before:top-0 before:-z-10 before:h-full before:w-full before:cursor-pointer before:rounded-full before:bg-primary-4f4f4f'
					: ''} flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all duration-500 ease-in-out"
			>
				<QuestionAnswerIcon
					class="h-7 w-7 {$show_modal_chat ? 'text-white' : 'text-[#8885ff]'}"
				/>
			</button>
		</div>
		<!-- ---------------------------------- END: Button for Inbox ---------------------------------- -->
	{/if}

	{#if $show_modal_chat === false && $show_modal_task === false}
		<!-- ---------------------------------- START: Button for Opening All CTA ---------------------------------- -->
		<button
			type="button"
			transition:fly={{
				delay: 0,
				duration: 300,
				x: 300,
				opacity: 0,
				easing: quadInOut
			}}
			on:click={() => (show_all_cta = !show_all_cta)}
			class="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-primary-2f80ed transition-all duration-500 ease-in-out hover:bg-primary-2f80ed/80"
		>
			<CloudLightning class="h-14 w-14 text-white" />
		</button>
		<!-- ---------------------------------- END: Button for Opening All CTA ---------------------------------- -->
	{/if}
</div>
<!-- ------------------------------------------ END: Call To Action ------------------------------------------ -->

<!-- ------------------------------------------ START: Modal Inbox & Task ------------------------------------------ -->
<ModalInbox {chat_data} {chat_customer_service} {chat_user_conversation} />

<ModalTask {task_list} />
<!-- ------------------------------------------ END: Modal Inbox & Task ------------------------------------------ -->

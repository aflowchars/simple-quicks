<script>
	//------------------------------------------------------------------------------------//
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	import {
		Dialog,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Popover,
		PopoverButton,
		PopoverPanel,
		Switch,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	import { current_page, show_modal_task } from '$lib/stores';

	import {
		CheckIcon,
		ExpandMoreIcon,
		LoadingIcon,
		MoreHorizontalIcon,
		PencilIcon,
		ScheduleIcon
	} from '$lib/icons';

	//------------------------------------------------------------------------------------//
	// Modal Show
	//------------------------------------------------------------------------------------//
	/**
	 * @type {any}
	 */
	export let task_list;
	//------------------------------------------------------------------------------------//
	// Modal Show
	//------------------------------------------------------------------------------------//
	let show_all_task = true;

	setTimeout(() => {
		show_all_task = true;
	}, 5000);

	//------------------------------------------------------------------------------------//
	// Checkbox
	//------------------------------------------------------------------------------------//
	let toggle_checkbox = false;

	//------------------------------------------------------------------------------------//
	// Date Picker
	//------------------------------------------------------------------------------------//
	let date_value = '';

	//------------------------------------------------------------------------------------//
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/themes/default.css"
	/>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/duet.esm.js"
	></script>
	<script
		nomodule
		src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/duet.js"
	></script>
</svelte:head>

<!-- ------------------------------------------ START: Modal for Task ------------------------------------------ -->
<Transition show={$show_modal_task}>
	<Dialog
		on:close={() => {
			$show_modal_task = false;
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
				class="absolute {$show_modal_task
					? '!bottom-[71px]'
					: '!bottom-16'} right-[37px] my-8 inline-block h-[737px] w-[734px] origin-right transform overflow-hidden rounded-md border-[#333] bg-white {$current_page !==
				'/task_list'
					? 'p-0 pr-2.5'
					: 'py-6 pr-2.5'} text-left align-middle shadow-xl transition-all"
			>
				<nav class="relative z-10 flex items-center justify-between px-5 pt-4">
					<div class="flex w-72 justify-center">
						<Popover let:open class="flex flex-col items-center gap-2">
							<PopoverButton
								class="relative flex w-fit flex-row items-start gap-2 rounded-[5px] border border-primary-828282 px-3.5 py-2.5 transition-all duration-300 ease-in-out hover:bg-primary-4f4f4f/5"
							>
								<span
									class="text-base font-bold leading-none text-primary-4f4f4f"
								>
									My Task
								</span>

								<ExpandMoreIcon
									class="h-5 w-5 flex-shrink-0 text-primary-4f4f4f"
								/>
							</PopoverButton>

							{#if open}
								<div
									class="absolute top-full"
									transition:fly={{
										delay: 0,
										duration: 300,
										y: 8,
										opacity: 0,
										easing: quadInOut
									}}
								>
									<PopoverPanel
										class="ml-2.5 mt-2 flex w-72 flex-col items-start overflow-hidden rounded-[5px] border border-primary-828282 bg-white"
									>
										<button
											class="w-full border-b border-primary-828282 bg-white p-3.5 pb-2.5 text-left text-base font-bold leading-none transition-all duration-300 ease-in-out last:border-b-0 hover:bg-primary-828282/10"
										>
											Personal Errands
										</button>

										<button
											class="w-full border-b border-primary-828282 bg-white p-3.5 pt-2.5 text-left text-base font-bold leading-none transition-all duration-300 ease-in-out last:border-b-0 hover:bg-primary-828282/10"
										>
											Urgent To-Do
										</button>
									</PopoverPanel>
								</div>
							{/if}
						</Popover>
					</div>

					<button
						class="relative rounded-[5px] bg-primary-2f80ed px-4 py-2 transition-all duration-300 ease-in-out hover:bg-primary-2f80ed/90"
					>
						<span class="text-base font-bold text-white">New Task</span>
					</button>
				</nav>

				<main class="relative z-0 h-full w-full overflow-y-auto pr-2.5">
					{#if show_all_task === false}
						<div
							class="-mt-[58px] flex h-full w-full flex-col items-center justify-center"
						>
							<LoadingIcon class="h-[86px] w-[86px] animate-spin" />

							<p class="text-base font-bold text-primary-4f4f4f">
								Loading Chats...
							</p>
						</div>
					{:else if show_all_task === true}
						<section class="relative pl-7 pr-2.5">
							{#each task_list as task, index}
								<Disclosure let:open class="relative bg-white py-5">
									<DisclosureButton
										class="flex w-full items-center justify-between"
									>
										<div class="flex flex-row items-center gap-5">
											<Switch
												bind:checked={task.is_checked}
												class="flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border-2 border-primary-828282"
											>
												{#if task.is_checked}
													<CheckIcon class="h-3.5 w-3.5 text-primary-828282" />
												{/if}
											</Switch>

											<h5
												class="font-bold text-primary-4f4f4f {task.is_checked
													? 'line-through'
													: ''}"
											>
												{task.title}
											</h5>
										</div>

										<div class="relative flex flex-row items-center pr-7">
											<p
												class="mr-5 text-base font-normal text-indicator-eb5757"
											>
												{task.due_date}
											</p>

											<p
												class="mr-2.5 text-base font-normal text-primary-4f4f4f"
											>
												{task.created_at}
											</p>

											<button
												class="mr-2 flex h-6 w-6 {open
													? 'rotate-180'
													: 'rotate-0'} items-center justify-center"
											>
												<ExpandMoreIcon class="h-5 w-5 text-primary-4f4f4f" />
											</button>
										</div>
									</DisclosureButton>

									<Popover class="absolute right-0 top-5 z-50">
										<PopoverButton
											class="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-primary-828282/5"
										>
											<MoreHorizontalIcon class="h-5 w-5 text-primary-4f4f4f" />
										</PopoverButton>

										<PopoverPanel
											class="absolute right-0 top-full z-50 mt-2 flex w-32 flex-col items-start rounded-md border border-[#BDBDBD] bg-white"
										>
											<button
												class="w-full border-b border-[#bdbdbd] py-3 pl-5 text-left text-base text-indicator-eb5757 transition-all duration-300 ease-in-out last:border-b-0 hover:bg-primary-828282/10"
											>
												Delete
											</button>
										</PopoverPanel>
									</Popover>

									{#if open}
										<div
											transition:fly={{
												delay: 0,
												duration: 300,
												y: -24,
												opacity: 0,
												easing: quadInOut
											}}
											class="relative w-full bg-white"
										>
											<DisclosurePanel static class="relative -z-0 mt-4 w-full">
												<section class="mb-3 flex items-center gap-4 pl-8">
													<ScheduleIcon class="h-5 w-5 text-primary-2f80ed" />

													<duet-date-picker
														identifier="date"
														on:duetChange={(
															/** @type {{ detail: { value: string; }; }} */ event
														) => {
															date_value = event.detail.value;

															console.log(date_value);
														}}
														value={task.created_at}
													/>
												</section>

												<section class="flex items-start gap-4 pl-8">
													<PencilIcon
														class="mt-2.5 h-4 w-4 text-primary-828282"
													/>

													<textarea
														value={task.description}
														placeholder="No Description"
														class="relative w-10/12 border-b border-transparent py-1 pl-1 outline-0 transition-all duration-300 ease-in-out placeholder:text-primary-4f4f4f focus:border-primary-4f4f4f"
													/>
												</section>
											</DisclosurePanel>
										</div>
									{/if}
								</Disclosure>

								<div class="h-px w-full border-b border-primary-828282" />
							{/each}
						</section>
					{/if}
				</main>
			</section>
		</TransitionChild>
	</Dialog>
</Transition>

<!-- ------------------------------------------ END: Modal for Task ------------------------------------------ -->

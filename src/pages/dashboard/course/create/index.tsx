import { zodResolver } from '@hookform/resolvers/zod';
import { CircleNotch } from '@phosphor-icons/react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseCreateCourseMutation } from '@/mutation/course';

import type { CreateCourseForm } from './form';
import { Schema } from './form';

export function Create(): React.ReactElement {
	const navigate = useNavigate();
	const form = useForm<CreateCourseForm>({
		resolver: zodResolver(Schema),
		mode: 'onSubmit',
	});

	const { mutateAsync: create, status: createStatus } = UseCreateCourseMutation(
		{
			onError(error) {
				if (error instanceof AxiosError) {
					// toast.error(error.response?.data.message);
					toast.error('Houve um erro ao tentar publicar.');
				}
				console.log(error);
			},
			onSuccess() {
				toast.success('Seu novo curso foi publicado.');
				navigate('/dashboard/course');
			},
		},
	);

	const handleCreate = form.handleSubmit((data) =>
		create({ ...data, period: Number(data.period) }),
	);

	return (
		<section className="flex flex-1 w-full h-full justify-center items-center flex-col gap-5 text-[#007bff]">
			<div className="flex w-full">
				<h1 className="text-2xl  font-bold">Novo Curso</h1>
			</div>
			<div className="flex flex-1 w-full h-full">
				<Form {...form}>
					<form
						onSubmit={handleCreate}
						className="flex flex-col gap-8  w-full flex-1 h-max-full"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className=" text-md">Nome</FormLabel>
									<FormControl>
										<Input
											placeholder="Nome do curso"
											className="text-base py-4"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-row gap-4 flex-1">
							<FormField
								control={form.control}
								name="period"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel className="text-md">Período</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={String(field.value ?? '')}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o período do curso" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="4">4 meses</SelectItem>
												<SelectItem value="6">6 meses</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="level"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel className="text-md">Nível</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o nível do curso" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="basic">Básico</SelectItem>
												<SelectItem value="intermediary">
													Intermediário
												</SelectItem>
												<SelectItem value="advanced">Avançado</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="public"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel className="text-md">Público</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o público do curso" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="6 a 10 anos">6 a 10 anos</SelectItem>
												<SelectItem value="11 a 16 anos">
													11 a 16 anos
												</SelectItem>
												<SelectItem value="13 a 16 anos">
													13 a 16 anos
												</SelectItem>
												<SelectItem value="Adultos">Adultos</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="price"
								defaultValue={0}
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel className="text-md">Preço</FormLabel>
										<FormControl>
											<Input
												placeholder="R$ 0,00"
												className="text-base py-4"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md">Descrição</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Uma descrição do seu curso"
											className="text-base py-4 resize-none"
											rows={5}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end py-4">
							<Button
								type="submit"
								className="bg-[#007bff] uppercase"
								disabled={createStatus === 'pending'}
							>
								{createStatus === 'pending' && (
									<CircleNotch className="animate-spin" />
								)}

								{!(createStatus === 'pending') && <span>Publicar</span>}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</section>
	);
}

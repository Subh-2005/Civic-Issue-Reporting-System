import React, { useEffect, useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Account = () => {
	const [user, setUser] = useState<any>(null);
	const [issues, setIssues] = useState<any[]>([]);
	const [profileData, setProfileData] = useState<any>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (data?.user) {
				setUser(data.user);
			} else {
				setUser(null);
			}
		};
		fetchUser();
	}, []);

	useEffect(() => {
		if (!user) return;
		const fetchIssues = async () => {
			// Fetch user profile to check role
			const { data: profile } = await (supabase as any)
				.from("profiles")
				.select("role")
				.eq("id", user.id)
				.maybeSingle();
			setProfileData(profile);
			if (profileData?.role === "admin") {
				// Admin: fetch all citizen issues
				const { data, error } = await (supabase as any)
					.from("issues")
					.select("*");
				if (!error && data) setIssues(data);
			} else {
				// Citizen: fetch only own issues
				const { data, error } = await (supabase as any)
					.from("issues")
					.select("*")
					.eq("user_id", user.id);
				if (!error && data) setIssues(data);
			}
		};
		fetchIssues();
	}, [user]);

	if (!user) {
		return (
			<div className="min-h-screen bg-background flex flex-col justify-center items-center">
				<Header />
				<main className="flex-1 flex flex-col justify-center items-center">
					<Card className="max-w-md w-full">
						<CardHeader>
							<CardTitle>My Account</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">You are not logged in.</div>
							<button
								className="mt-6 w-full bg-primary text-white py-2 rounded"
								onClick={() => navigate("/login")}
							>
								Go to Login
							</button>
						</CardContent>
					</Card>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white text-black dark:bg-dark-blue-gradient dark:text-white">
			<Header />
			<main className="pt-20 pb-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
					<Card>
						<CardHeader>
							<CardTitle>My Account</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<span className="font-medium">Email:</span> {user.email}
								</div>
								<div>
									<span className="font-medium">User ID:</span> {user.id}
								</div>
							</div>
							<div className="mt-8">
								{/* Admin dashboard view */}
								{issues.length > 0 && (
									<>
										<h3 className="text-lg font-semibold mb-2">{profileData?.role === "admin" ? "All Submitted Issues (Admin)" : "My Submitted Issues"}</h3>
										{/* Advanced filtering for admin */}
										{profileData?.role === "admin" && (
											<div className="mb-4 flex gap-2 flex-wrap">
												<button className="px-3 py-1 rounded bg-blue-100 text-blue-800">Critical</button>
												<button className="px-3 py-1 rounded bg-green-100 text-green-800">Resolved</button>
												<button className="px-3 py-1 rounded bg-yellow-100 text-yellow-800">Pending</button>
												<button className="px-3 py-1 rounded bg-orange-100 text-orange-800">In Progress</button>
												{/* Add more advanced filters here */}
											</div>
										)}
										<div className="grid gap-4">
											{issues.map((issue) => (
												<Card key={issue.id} className="border p-4 shadow-md hover:shadow-lg transition">
													<div className="flex justify-between items-center mb-2">
														<span className="font-semibold text-lg">{issue.title}</span>
														<span className={`text-xs px-2 py-1 rounded ${issue.status === "Resolved" ? "bg-green-100 text-green-800" : issue.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>{issue.status}</span>
													</div>
													<div className="flex gap-2 mb-1">
														<span className="text-xs bg-blue-50 px-2 py-1 rounded">Category: {issue.category}</span>
														<span className="text-xs bg-orange-50 px-2 py-1 rounded">Priority: {issue.priority}</span>
													</div>
													<div className="text-sm text-muted-foreground mb-1">Location: {issue.location}</div>
													<div className="text-sm text-muted-foreground">Description: {issue.description}</div>
												</Card>
											))}
										</div>
									</>
								)}
								{/* Summary Stats */}
								<div className="mt-6">
									<h4 className="font-medium mb-2">Summary</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="bg-blue-50 p-3 rounded text-center">
											<div className="text-lg font-bold">{issues.length}</div>
											<div className="text-xs text-muted-foreground">Total Issues</div>
										</div>
										<div className="bg-green-50 p-3 rounded text-center">
											<div className="text-lg font-bold">{issues.filter(i => i.status === "Resolved").length}</div>
											<div className="text-xs text-muted-foreground">Resolved</div>
										</div>
										<div className="bg-yellow-50 p-3 rounded text-center">
											<div className="text-lg font-bold">{issues.filter(i => i.status === "Pending").length}</div>
											<div className="text-xs text-muted-foreground">Pending</div>
										</div>
										<div className="bg-orange-50 p-3 rounded text-center">
											<div className="text-lg font-bold">{issues.filter(i => i.status === "In Progress").length}</div>
											<div className="text-xs text-muted-foreground">In Progress</div>
										</div>
									</div>
								</div>
							</div>
							<button
								className="mt-6 w-full bg-primary text-white py-2 rounded"
								onClick={() => navigate("/")}
							>
								Back to Home
							</button>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Account;

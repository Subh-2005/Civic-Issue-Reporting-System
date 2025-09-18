



import { supabase } from "@/integrations/supabase/client";

// Returns number of issues submitted by user in current month
export async function getUserMonthlyIssueCount(userId: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  const { data, error } = await supabase
    .from("user_issue_rewards")
    .select("issue_count")
    .eq("user_id", userId)
    .eq("month", month)
    .single();
  if (error || !data) return 0;
  return data.issue_count;
}

// Mark tokens as claimed for user
export async function claimUserTokens(userId: string, walletAddress: string): Promise<boolean> {
  const month = new Date().toISOString().slice(0, 7);
  const { error } = await supabase
    .from("user_issue_rewards")
    .update({ tokens_claimed: true, wallet_address: walletAddress, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("month", month);
  return !error;
}

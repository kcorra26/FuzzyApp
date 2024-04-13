export function gettingDist(a,b) {

    // initialize matrix
    dp = [];
    
    for (let i = 0; i <= a.length; i++) {
        dp[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
        dp[0][j] = j; 
    }

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a.charAt(i-1) === b.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = (Math.min(dp[i-1][j], Math.min(dp[i-1][j-1], dp[i][j-1]))) + 1;
            }
        }
    }
    return dp[a.length][b.length];
    // console.log(`final dif between ${a} and ${b} is ${dp[a.length][b.length]}`);
}

// gettingDist('party', 'pastry');
// gettingDist('sitting', 'sittin');
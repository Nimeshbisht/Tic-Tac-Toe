# Tic Tac Toe

Minimax is a kind of backtracking algorithm that is used in decision making and
game theory to find the optimal move for a player, assuming that your opponent
also plays optimally. It is widely used in two player turn-based games such as
Tic-Tac-Toe, Chess etc.

### Pseudo code:

```
function minimax(node, depth, maximizingPlayer, alpha, beta) is
    if depth = 0 or node is a terminal node then
        return the heuristic value of node
    if maximizingPlayer then
        value := −∞
        for each child of node do
            value := max(value, minimax(child, depth − 1, FALSE, alpha, beta))
            alpha = max(value, alpha)
            if beta <= alpha
                break;
        return value
    else (* minimizing player *)
        value := +∞
        for each child of node do
            value := min(value, minimax(child, depth − 1, TRUE, alpha, beta))
            beta = min(value, beta)
            if beta <= alpha
                break;
        return value

```

### Demo:

![tictactoe](/src/tictactoe.gif)

<p align="center"> You can find this live <a href="https://karthik-nayak98.github.io/tic-tac-toe/">here</a>  </p>

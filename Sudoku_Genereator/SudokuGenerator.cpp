#include <bits/stdc++.h>
using namespace std;

class Sudoku {
public:
	int** mat;
	int N;

	int SRN;
	int K;

	Sudoku(int N, int K)
	{
		this->N = N;
		this->K = K;

		double SRNd = sqrt(N);
		SRN = (int)SRNd;
		mat = new int*[N];
		for (int i = 0; i < N; i++)
		{
			mat[i] = new int[N];
			memset(mat[i], 0, N * sizeof(int));
		}
	}

	// Sudoku Generator
	void fillValues()
	{
			fillDiagonal();
			fillRemaining(0, SRN);
			removeKDigits();
	}

	void fillDiagonal()
	{
		for (int i = 0; i < N; i = i + SRN)
		{
					fillBox(i, i);
		}
	}

  bool unUsedInBox(int rowStart, int colStart, int num)
	{
		for (int i = 0; i < SRN; i++) {
			for (int j = 0; j < SRN; j++) {
				if (mat[rowStart + i][colStart + j]
					== num) {
					return false;
				}
			}
		}
		return true;
	}

  void fillBox(int row, int col)
	{
		int num;
		for (int i = 0; i < SRN; i++) {
			for (int j = 0; j < SRN; j++) {
				do {
					num = randomGenerator(N);
				} while (!unUsedInBox(row, col, num));
				mat[row + i][col + j] = num;
			}
		}
	}

  int randomGenerator(int num)
	{
		return (int)floor(
			(float)(rand() / double(RAND_MAX) * num + 1));
	}

  bool CheckIfSafe(int i, int j, int num)
	{
		return (
			unUsedInRow(i, num) && unUsedInCol(j, num)
			&& unUsedInBox(i - i % SRN, j - j % SRN, num));
	}

  bool unUsedInRow(int i, int num)
	{
		for (int j = 0; j < N; j++) {
			if (mat[i][j] == num) {
				return false;
			}
		}
		return true;
	}

	bool unUsedInCol(int j, int num)
	{
		for (int i = 0; i < N; i++) {
			if (mat[i][j] == num) {
				return false;
			}
		}
		return true;
	}
  
	bool fillRemaining(int i, int j)
	{
		// System.out.println(i+" "+j);
		if (j >= N && i < N - 1) {
			i = i + 1;
			j = 0;
		}
		if (i >= N && j >= N) {
			return true;
		}
		if (i < SRN) {
			if (j < SRN) {
				j = SRN;
			}
		}
		else if (i < N - SRN) {
			if (j == (int)(i / SRN) * SRN) {
				j = j + SRN;
			}
		}
		else {
			if (j == N - SRN) {
				i = i + 1;
				j = 0;
				if (i >= N) {
					return true;
				}
			}
		}
		for (int num = 1; num <= N; num++) {
			if (CheckIfSafe(i, j, num)) {
				mat[i][j] = num;
				if (fillRemaining(i, j + 1)) {
					return true;
				}
				mat[i][j] = 0;
			}
		}
		return false;
	}
  
	void removeKDigits()
	{
		int count = K;
		while (count != 0) {
			int cellId = randomGenerator(N * N) - 1;
			int i = (cellId / N);
			int j = cellId % 9;
			if (j != 0) {
				j = j - 1;
			}
			if (mat[i][j] != 0) {
				count--;
				mat[i][j] = 0;
			}
		}
	}
	void printSudoku()
	{
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				cout << to_string(mat[i][j]) + " ";
			}
			cout << endl;
		}
		cout << endl;
	}
};

int main()
{
	int N = 9;
	int K = 20;
	Sudoku* sudoku = new Sudoku(N, K);
	sudoku->fillValues();
	sudoku->printSudoku();
	return 0;
}


#include <bits/stdc++.h>

using namespace std;

string X[100000+5];
char asciitolower(char in) {
    if (in <= 'Z' && in >= 'A')
        return in - ('Z' - 'z');
    return in;
}
string stringToLower(string a){
  string res="";
  for(int i=0;i<a.length();i++){
    res+=asciitolower(a[i]);
  }
  return res;
}
bool ile_pas(string a, string b){
  map<char,bool> L;
  for(int i=0;i<a.length();i++){
    L[a[i]]=true;
  }
  for(int i=0;i<b.length();i++){
    if(L[b[i]]){
      return true;
    }
  }
  return false;
}

int main(){
	ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
	//Twój kod
  int n,r;
  cin >> n >> r;
  for(int i=0;i<n;i++){
    cin >> X[i];
    X[i]=stringToLower(X[i]);
  }
  for(int i=0;i<n;i++){
    if(i==0){
      cout << 1+ile_pas(X[i],X[i+1]);
    }else if(i==n-1){
      cout << 1+ile_pas(X[i],X[i-1]);
    }else{
      cout << 1+ile_pas(X[i],X[i-1])+ile_pas(X[i],X[i+1]);
    }
    cout << endl;
  }
	return 0;
}